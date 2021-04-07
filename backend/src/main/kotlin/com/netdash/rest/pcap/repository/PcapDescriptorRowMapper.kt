package com.netdash.rest.pcap.repository

import com.netdash.rest.pcap.model.PcapDescriptor
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class PcapDescriptorRowMapper : RowMapper<PcapDescriptor> {
    override fun mapRow(resultSet: ResultSet, rowNum: Int): PcapDescriptor {
        return PcapDescriptor(
            resultSet.getString("name"),
            resultSet.getLong("count"),
            TableIdentifier.from(resultSet.getString("type")),
            mutableListOf()
        )
    }
}
