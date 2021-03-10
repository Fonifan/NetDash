package com.netdash.rest.pcap.model

interface Data {
    fun get(): Collection<Map<String, Any>>
}
