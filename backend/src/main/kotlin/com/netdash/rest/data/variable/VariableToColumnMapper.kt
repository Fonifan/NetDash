package com.netdash.rest.data.variable

import com.netdash.rest.pcap.repository.TableIdentifier

class VariableToColumnMapper(private val tableId: TableIdentifier) {
    private val columnMap = mapOf(
        "conversation" to mapOf(
            "startDate" to "packettime",
            "endDate" to "packettime",
            "sourceIp" to "sourceip",
            "destinationIp" to "destinationip",
            "protocol" to "protocol",
            "sourcePort" to "sourceport",
        )
    )

    fun map(variable: String): String {
        val searchString = if (variable.startsWith("only_")) variable.replace("only_", "") else variable
        val columnMap =
            columnMap[tableId.tableName] ?: throw IllegalArgumentException("No column map for ${tableId.tableName}")
        return columnMap[searchString] ?: throw IllegalArgumentException("No variable to column mapping for $variable")
    }
}
