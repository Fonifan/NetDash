package com.netdash.rest.pcap.model.encrypted

data class EncryptedPacket(
    val timestamp: Long,
    val client: String,
    val alpn: String,
    val ciphersuite: String,
    val duration: Long,
    val flowkey: String,
    val fwdrecords: Long,
    val ja3Client: String,
    val ja3Server: String,
    val revrecords: Long,
    val servername: String,
    val version: String,
    val name: String,
)
