package com.netdash.rest.pcap.model

data class PcapData(val name: String, val data: List<ConsumedPacket>) : Data {
    override fun get(): Collection<Map<String, Any>> {
        return data.map { packet -> DynamicPacket(packet).data }
    }
}
