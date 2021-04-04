package com.netdash.rest.pcap.model.conversation

data class ConversationPacket(
    val sourceIp: String,
    val destinationIp: String,
    val sourcePort: Int,
    val destinationPort: Int,
    val packetTime: Long,
    val protocol: String,
    val octets: Int,
)
