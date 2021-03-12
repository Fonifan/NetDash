package com.netdash.rest.pcap.repository

import com.netdash.rest.data.transformer.model.DataMap
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.PcapData
import com.netdash.rest.pcap.repository.PcapRepository.Companion.PCAP_TABLE
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.BatchPreparedStatementSetter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement

@Repository
//TODO: use all return values for error checking
open class JdbcPcapRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) : PcapRepository {
    private val defaultBucketSize = 1000

    override fun findByName(name: String, bucketized: Boolean): PcapData? {
        val data = jdbcTemplate.query("select * from ${preparePcapTableName(name, bucketized)}", PcapRowMapper()).toList()
        if (data.isEmpty())
            return null

        return PcapData(name, data)
    }

    override fun save(pcapData: PcapData) {
        jdbcTemplate.batchUpdate("insert into $PCAP_TABLE values(?,?,?,?,?,?,?,?)", object : BatchPreparedStatementSetter {
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
        val newTableName = PCAP_TABLE + "_" + pcapData.name

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

    override fun delete(name: String): Boolean {
        return jdbcTemplate.update("drop table ${PCAP_TABLE}_${name}") == 1
    }

    override fun executeQuery(
        pcapName: String,
        bucketized: Boolean,
        query: String,
        dataMap: DataMap,
    ): Data? {
        val preparedQuery = query.replaceFirst(":pcapName", preparePcapTableName(pcapName, bucketized))

        val data = jdbcTemplate.query(preparedQuery, DynamicRowMapper(dataMap)).toList()

        if (data.isEmpty())
            return null

        return Data(data.map { dynamicPacket -> dynamicPacket.data })
    }

    private fun preparePcapTableName(pcapName: String, bucketized: Boolean): String {
        return if (bucketized) "\"pcap_${pcapName}_bucket\"" else "\"pcap_$pcapName\""
    }
}

