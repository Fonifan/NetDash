package com.netdash.rest.pcap.repository.impl


import com.netdash.rest.pcap.model.conversation.ConversationData
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.repository.PcapRepository
import com.netdash.rest.pcap.model.conversation.ConversationRowMapper
import com.netdash.rest.pcap.repository.TableIdentifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.BatchPreparedStatementSetter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement

@Repository
//TODO: use all return values for error checking
open class JdbcConversationRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) : PcapRepository {
    private val defaultBucketSize = 1000
    override val tableIdentifier: TableIdentifier
        get() = TableIdentifier.CONVERSATION

    override fun findByName(name: String, bucketized: Boolean): ConversationData? {
        val data =
            jdbcTemplate.query("select * from ${tableIdentifier.prepareTableName(name, bucketized)}", ConversationRowMapper()).toList()
        if (data.isEmpty())
            return null

        return ConversationData(name, data)
    }

    override fun save(pcapData: Data) {
        if (pcapData !is ConversationData)
            throw IllegalArgumentException("Can't store data of type ${pcapData.javaClass.name} in Conversation Repository")

        jdbcTemplate.batchUpdate("insert into ${tableIdentifier.name} values(?,?,?,?,?,?,?,?)",
            object : BatchPreparedStatementSetter {
                override fun setValues(preparedStatement: PreparedStatement, i: Int) {
                    preparedStatement.setString(1, pcapData.pcapData[i].sourceIp)
                    preparedStatement.setString(2, pcapData.pcapData[i].destinationIp)
                    preparedStatement.setInt(3, pcapData.pcapData[i].sourcePort)
                    preparedStatement.setInt(4, pcapData.pcapData[i].destinationPort)
                    preparedStatement.setLong(5, pcapData.pcapData[i].packetTime)
                    preparedStatement.setString(6, pcapData.pcapData[i].protocol)
                    preparedStatement.setInt(7, pcapData.pcapData[i].octets)
                    preparedStatement.setString(8, pcapData.name)
                }

                override fun getBatchSize(): Int {
                    return pcapData.pcapData.size
                }
            })

        this.createBuckets(tableIdentifier.short + "_" + pcapData.name)
    }

    override fun delete(name: String): Boolean {
        return jdbcTemplate.update("drop table ${tableIdentifier.prepareTableName(name, false)} cascade ") == 1
    }

    private fun createBuckets(newTableName: String) {
        jdbcTemplate.execute(
            "create materialized view \"${newTableName + "_bucket"}\" as\n" +
                    "        select sourceip, destinationip, sourceport, destinationport, pt as packettime, protocol, sum as octets, name\n" +
                    "          from (\n" +
                    "              select sourceip, destinationip, sourceport, destinationport, time_bucket($defaultBucketSize, packettime) as pt, protocol,\n" +
                    "                     sum(octets), name\n" +
                    "                from \"$newTableName\"\n" +
                    "               group by sourceip, destinationip, sourceport, destinationport, pt, protocol, name\n" +
                    "               order by pt\n" +
                    "          ) as sub")
    }
}

