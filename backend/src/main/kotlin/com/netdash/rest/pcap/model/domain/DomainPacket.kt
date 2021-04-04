package com.netdash.rest.pcap.model.domain

data class DomainPacket(
    val timestamp: Long,
    val alexa: Boolean,
    val client: String,
    val dga: String,
    val category: String,
    val domain: String,
    val status: String,
    val flowKey: String,
    val resolvedTo: String,
    val rtt: Long,
    val server: String,
    val name: String,
)
