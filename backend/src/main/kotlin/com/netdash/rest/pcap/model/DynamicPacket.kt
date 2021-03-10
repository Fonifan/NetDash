package com.netdash.rest.pcap.model

data class DynamicPacket(val data: Map<String, Any>) {
    constructor(packet: ConsumedPacket) : this(
        mapOf(
            "sourceIp" to packet.sourceIp,
            "destinationIp" to packet.destinationIp,
            "sourcePort" to packet.sourcePort,
            "destinationPort" to packet.destinationPort,
            "packetTime" to packet.packetTime,
            "protocol" to packet.protocol,
            "octets" to packet.octets,
        )
    )
}
