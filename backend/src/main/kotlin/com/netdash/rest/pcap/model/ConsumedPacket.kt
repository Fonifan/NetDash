package com.netdash.rest.pcap.model

data class ConsumedPacket(
    val sourceIp: String,
    val destinationIp: String,
    val sourcePort: Int,
    val destinationPort: Int,
    val packetTime: Long,
    val protocol: String,
    val octets: Int
)
