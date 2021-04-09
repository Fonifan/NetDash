package com.netdash.rest.pcap.repository

import com.netdash.rest.data.transformer.model.DataMap
import com.netdash.rest.pcap.model.DynamicPacket
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class DynamicRowMapper(private val dataMap: DataMap) : RowMapper<DynamicPacket> {
    override fun mapRow(rs: ResultSet, rowNum: Int): DynamicPacket {
        val row = HashMap<Any, Any>(dataMap.size)

        dataMap.values.forEach { columnName ->
            row[columnName] = rs.getObject(columnName)
        }

        return DynamicPacket(row)
    }
}
