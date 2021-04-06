package com.netdash.rest.pcap.repository.impl

import EncryptedRowMapper
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.encrypted.EncryptedData
import com.netdash.rest.pcap.repository.PcapRepository
import com.netdash.rest.pcap.repository.TableIdentifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.BatchPreparedStatementSetter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement

@Repository
open class JdbcEncryptedRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) : PcapRepository {
    override val tableIdentifier: TableIdentifier
        get() = TableIdentifier.ENCRYPTED

    override fun findByName(name: String, bucketized: Boolean): EncryptedData? {
        val data =
            jdbcTemplate.query("select * from ${tableIdentifier.prepareTableName(name, bucketized)}", EncryptedRowMapper()).toList()
        if (data.isEmpty())
            return null

        return EncryptedData(name, data)
    }

    override fun save(data: Data) {
        if (data !is EncryptedData)
            throw IllegalArgumentException("Can't store data of type ${data.javaClass.name} in Domain Repository")

        jdbcTemplate.batchUpdate("insert into ${tableIdentifier.name} values(?,?,?,?,?,?,?,?)",
            object : BatchPreparedStatementSetter {
                override fun setValues(preparedStatement: PreparedStatement, i: Int) {
                    preparedStatement.setLong(1, data.pcapData[i].timestamp)
                    preparedStatement.setString(2, data.pcapData[i].client)
                    preparedStatement.setString(3, data.pcapData[i].alpn)
                    preparedStatement.setString(4, data.pcapData[i].ciphersuite)
                    preparedStatement.setLong(5, data.pcapData[i].duration)
                    preparedStatement.setString(6, data.pcapData[i].flowkey)
                    preparedStatement.setLong(7, data.pcapData[i].fwdrecords)
                    preparedStatement.setString(8, data.pcapData[i].ja3Client)
                    preparedStatement.setString(9, data.pcapData[i].ja3Server)
                    preparedStatement.setLong(10, data.pcapData[i].revrecords)
                    preparedStatement.setString(11, data.pcapData[i].servername)
                    preparedStatement.setString(12, data.pcapData[i].version)
                    preparedStatement.setString(13, data.pcapData[i].name)
                }

                override fun getBatchSize(): Int {
                    return data.pcapData.size
                }
            })
    }

    override fun delete(name: String): Boolean {
        return jdbcTemplate.update("drop table ${tableIdentifier.prepareTableName(name, false)} cascade ") == 1
    }

}
