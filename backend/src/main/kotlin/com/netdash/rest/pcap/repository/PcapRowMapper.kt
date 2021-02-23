package com.netdash.rest.pcap.repository

import com.netdash.rest.pcap.model.ConsumedPacket
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class PcapRowMapper : RowMapper<ConsumedPacket> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): ConsumedPacket {
        return ConsumedPacket(
            resultSet.getString("sourceIp"),
            resultSet.getString("destinationIp"),
            resultSet.getInt("sourcePort"),
            resultSet.getInt("destinationPort"),
            resultSet.getLong("packetTime"),
            resultSet.getString("protocol"),
            resultSet.getInt("octets")
        )
    }
}
