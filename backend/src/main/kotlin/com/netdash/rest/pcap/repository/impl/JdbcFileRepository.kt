package com.netdash.rest.pcap.repository.impl

import FileRowMapper
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.file.FileData
import com.netdash.rest.pcap.repository.PcapRepository
import com.netdash.rest.pcap.repository.TableIdentifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.BatchPreparedStatementSetter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.sql.PreparedStatement

@Repository
open class JdbcFileRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) : PcapRepository {
    override val tableIdentifier: TableIdentifier
        get() = TableIdentifier.FILE

    override fun findByName(name: String, bucketized: Boolean): FileData? {
        val data =
            jdbcTemplate.query("select * from \"${tableIdentifier.prepareTableName(name, bucketized)}\"", FileRowMapper()).toList()
        if (data.isEmpty())
            return null

        return FileData(name, data)
    }

    override fun save(data: Data) {
        if (data !is FileData)
            throw IllegalArgumentException("Can't store data of type ${data.javaClass.name} in Domain Repository")

        jdbcTemplate.batchUpdate("insert into ${tableIdentifier.name} values(?,?,?,?,?,?,?,?)",
            object : BatchPreparedStatementSetter {
                override fun setValues(preparedStatement: PreparedStatement, i: Int) {
                    preparedStatement.setLong(1, data.pcapData[i].timestamp)
                    preparedStatement.setString(2, data.pcapData[i].application)
                    preparedStatement.setString(3, data.pcapData[i].client)
                    preparedStatement.setString(4, data.pcapData[i].contenttype)
                    preparedStatement.setString(5, data.pcapData[i].filetype)
                    preparedStatement.setString(6, data.pcapData[i].server)
                    preparedStatement.setLong(7, data.pcapData[i].contentlength)
                    preparedStatement.setString(8, data.pcapData[i].exportedpath)
                    preparedStatement.setString(9, data.pcapData[i].filetypemismatch)
                    preparedStatement.setString(10, data.pcapData[i].flowkey)
                    preparedStatement.setString(11, data.pcapData[i].name)
                }

                override fun getBatchSize(): Int {
                    return data.pcapData.size
                }
            })
    }

    override fun delete(name: String): Boolean {
        return jdbcTemplate.update("drop table \"${tableIdentifier.prepareTableName(name, false)}\" cascade ") == 1
    }

}
