package com.netdash.rest.pcap.repository.impl

import DomainRowMapper
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.domain.DomainData
import com.netdash.rest.pcap.repository.PcapRepository
import com.netdash.rest.pcap.repository.TableIdentifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.BatchPreparedStatementSetter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement

@Repository
open class JdbcDomainRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) : PcapRepository {
    override val tableIdentifier: TableIdentifier
        get() = TableIdentifier.DOMAIN

    override fun findByName(name: String, bucketized: Boolean): DomainData? {
        val data =
            jdbcTemplate.query("select * from ${tableIdentifier.prepareTableName(name, bucketized)}", DomainRowMapper()).toList()
        if (data.isEmpty())
            return null

        return DomainData(name, data)
    }

    override fun save(data: Data) {
        if (data !is DomainData)
            throw IllegalArgumentException("Can't store data of type ${data.javaClass.name} in Domain Repository")

        jdbcTemplate.batchUpdate("insert into ${tableIdentifier.name} values(?,?,?,?,?,?,?,?)",
            object : BatchPreparedStatementSetter {
                override fun setValues(preparedStatement: PreparedStatement, i: Int) {
                    preparedStatement.setLong(1, data.pcapData[i].timestamp)
                    preparedStatement.setBoolean(2, data.pcapData[i].alexa)
                    preparedStatement.setString(3, data.pcapData[i].client)
                    preparedStatement.setString(4, data.pcapData[i].dga)
                    preparedStatement.setString(5, data.pcapData[i].category)
                    preparedStatement.setString(6, data.pcapData[i].domain)
                    preparedStatement.setString(7, data.pcapData[i].status)
                    preparedStatement.setString(8, data.pcapData[i].flowKey)
                    preparedStatement.setString(9, data.pcapData[i].resolvedTo)
                    preparedStatement.setLong(10, data.pcapData[i].rtt)
                    preparedStatement.setString(11, data.pcapData[i].server)
                    preparedStatement.setString(12, data.pcapData[i].name)
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
