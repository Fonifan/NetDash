package com.netdash.rest.pcap.service

import com.netdash.rest.pcap.model.ConsumedPacket
import com.netdash.rest.pcap.model.PcapData
import org.jnetpcap.packet.JPacket
import org.jnetpcap.packet.JPacketHandler
import org.jnetpcap.packet.format.FormatUtils
import org.jnetpcap.protocol.lan.Ethernet
import org.jnetpcap.protocol.network.Arp
import org.jnetpcap.protocol.network.Icmp
import org.jnetpcap.protocol.network.Ip4
import org.jnetpcap.protocol.network.Ip6
import org.jnetpcap.protocol.tcpip.Tcp
import org.jnetpcap.protocol.tcpip.Udp


class PacketParser : JPacketHandler<StringBuilder> {
    private val data: MutableList<ConsumedPacket> = mutableListOf()
    private var unknownPackets = 0
    override fun nextPacket(packet: JPacket?, errorBuffer: StringBuilder?) {
        if (packet == null)
            return

        val tcpHeader = Tcp()
        val udpHeader = Udp()
        val ipHeader = Ip4()
        val icmpHeader = Icmp()
        val arpHeader = Arp()
        val ip6header = Ip6()

        var sourceIp: String? = null
        var destinationIp: String? = null
        var sourcePort: Int? = null
        var destinationPort: Int? = null
        val octets = packet.captureHeader.caplen()
        val time = packet.captureHeader.timestampInMillis()
        var protocol: String? = null

        if (packet.hasHeader(ipHeader)) {
            sourceIp = FormatUtils.ip(ipHeader.source())
            destinationIp = FormatUtils.ip(ipHeader.destination())
        }
        if (packet.hasHeader(tcpHeader)) {
            protocol = tcpHeader.name
            sourcePort = tcpHeader.source()
            destinationPort = tcpHeader.destination()
        }
        if (packet.hasHeader(udpHeader)) {
            protocol = udpHeader.name
            sourcePort = udpHeader.source()
            destinationPort = udpHeader.destination()
        }
        if (packet.hasHeader(icmpHeader)) {
            sourcePort = 0
            destinationPort = 0
            protocol = icmpHeader.name
        }
        if (packet.hasHeader(arpHeader)) {
            sourceIp = FormatUtils.ip(arpHeader.spa())
            destinationIp = FormatUtils.ip(arpHeader.tpa())
            sourcePort = 0
            destinationPort = 0
            protocol = arpHeader.name
        }
        if (packet.hasHeader(ip6header)) {
            sourceIp = FormatUtils.asStringIp6(ip6header.source(), true)
            destinationIp = FormatUtils.asStringIp6(ip6header.destination(), true)
            sourcePort = 0
            destinationPort = 0
            protocol = ip6header.name
        }

        if (sourceIp == null || destinationIp == null || sourcePort == null || destinationPort == null || protocol == null) {
            unknownPackets++
            return
        }
        data.add(
            ConsumedPacket(
                sourceIp,
                destinationIp,
                sourcePort,
                destinationPort,
                time,
                protocol,
                octets
            )
        )
    }

    fun getData(): PcapData {
        return PcapData(data.sortedBy { it.packetTime })
    }
}
