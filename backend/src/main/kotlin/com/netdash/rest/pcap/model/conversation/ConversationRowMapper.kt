package com.netdash.rest.pcap.model.conversation

import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class ConversationRowMapper : RowMapper<ConversationPacket> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): ConversationPacket {
        return ConversationPacket(
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
