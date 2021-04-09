package com.netdash.rest.pcap.model

import com.netdash.rest.pcap.model.conversation.ConversationPacket
import com.netdash.rest.pcap.model.domain.DomainPacket
import com.netdash.rest.pcap.model.encrypted.EncryptedPacket
import com.netdash.rest.pcap.model.file.FilePacket

data class DynamicPacket(val data: Map<Any, Any>) {
    constructor(packet: ConversationPacket) : this(
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

    constructor(packet: DomainPacket) : this(
        mapOf(
            "timestamp" to packet.timestamp,
            "alexa" to packet.alexa,
            "client" to packet.client,
            "dga" to packet.dga,
            "category" to packet.category,
            "domain" to packet.domain,
            "status" to packet.status,
            "flowKey" to packet.flowKey,
            "resolvedTo" to packet.resolvedTo,
            "rtt" to packet.rtt,
            "server" to packet.server,
            "name" to packet.name,
        )
    )

    constructor(packet: EncryptedPacket) : this(
        mapOf(

        )
    )

    constructor(packet: FilePacket) : this(
        mapOf(

        )
    )
}
