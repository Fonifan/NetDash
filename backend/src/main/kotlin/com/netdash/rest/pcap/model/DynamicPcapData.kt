package com.netdash.rest.pcap.model

data class DynamicPcapData(val data: Collection<DynamicPacket>) : Data {
    override fun get(): Collection<Map<String, Any>> {
        return data.map { row -> row.data }
    }
}
