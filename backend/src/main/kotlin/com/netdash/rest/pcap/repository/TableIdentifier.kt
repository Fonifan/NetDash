package com.netdash.rest.pcap.repository

import com.fasterxml.jackson.annotation.JsonValue

enum class TableIdentifier(val tableName: String, val short: String) {
    CONVERSATION("conversation", "c"),
    FILE("file", "f"),
    ENCRYPTED("encrypted", "e"),
    DOMAIN("domain", "d");

    fun prepareTableName(pcapName: String, bucketized: Boolean): String {
        return if (bucketized) "\"${short}_${pcapName}_bucket\"" else "\"${short}_$pcapName\""
    }

    @JsonValue
    fun getName(): String {
        return tableName
    }

    companion object {
        fun from(str: String): TableIdentifier = when (str) {
            "conversation" -> CONVERSATION
            "file" -> FILE
            "encrypted" -> ENCRYPTED
            "domain" -> DOMAIN
            else -> throw IllegalArgumentException("Can't find table with name: [${str}]")
        }
    }
}
