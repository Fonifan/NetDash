package com.netdash.rest.pcap.model

data class ConsumedPacket(
    val sourceIp: String,
    val destinationIp: String,
    val sourcePort: Int,
    val destinationPort: Int,
    val packetTime: Long,
    val protocol: String,
    val octets: Int,
) {
    fun get(propertyName: String): String = when (propertyName) {
        "sourceIp" -> sourceIp
        "destinationIp" -> destinationIp
        "sourcePort" -> sourcePort.toString()
        "destinationPort" -> destinationPort.toString()
        "packetTime" -> packetTime.toString()
        "protocol" -> protocol
        "octets" -> octets.toString()
        else -> throw IllegalArgumentException("Unexpected name of ConsumedPacket property: $propertyName")
    }
}
