package com.netdash.rest.pcap.repository

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
        val queryString = when (bucketized) {
            true -> "select * from \"pcap_${name}_bucket\""
            false -> "select * from \"pcap_$name\""
        }

        val data = jdbcTemplate.query(queryString, PcapRowMapper()).toList()
        if (data.isEmpty())
            return null

        return PcapData(name, data)
    }

    override fun save(pcapData: PcapData) {
        jdbcTemplate.batchUpdate("insert into $PCAP_TABLE values(?,?,?,?,?,?,?,?)", object : BatchPreparedStatementSetter {
            override fun setValues(preparedStatement: PreparedStatement, i: Int) {
                preparedStatement.setString(1, pcapData.data[i].sourceIp)
                preparedStatement.setString(2, pcapData.data[i].destinationIp)
                preparedStatement.setInt(3, pcapData.data[i].sourcePort)
                preparedStatement.setInt(4, pcapData.data[i].destinationPort)
                preparedStatement.setLong(5, pcapData.data[i].packetTime)
                preparedStatement.setString(6, pcapData.data[i].protocol)
                preparedStatement.setInt(7, pcapData.data[i].octets)
                preparedStatement.setString(8, pcapData.name)
            }

            override fun getBatchSize(): Int {
                return pcapData.data.size
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
}

