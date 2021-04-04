package com.netdash.rest.pcap.model.file

data class FilePacket(
    val timestamp: Long,
    val application: String,
    val client: String,
    val contenttype: String,
    val filetype: String,
    val server: String,
    val contentlength: Long,
    val exportedpath: String,
    val filetypemismatch: String,
    val flowkey: String,
    val name: String?,
)
