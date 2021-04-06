package com.netdash.rest.data.variable

import com.netdash.rest.pcap.repository.TableIdentifier

class VariableToColumnMapper(private val tableId: TableIdentifier) {
    private val columnMap = mapOf(
        "conversation" to mapOf(
            "startDate" to "packettime",
            "endDate" to "packettime",
        )
    )

    fun map(variable: String): String {
        val columnMap = columnMap[tableId.tableName] ?: throw IllegalArgumentException("No column map for ${tableId.tableName}")
        return columnMap[variable] ?: throw IllegalArgumentException("No variable to column mapping for $variable")
    }
}
