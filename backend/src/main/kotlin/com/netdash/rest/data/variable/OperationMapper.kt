package com.netdash.rest.data.variable

class OperationMapper {
    private val operationMap = mapOf(
        "startDate" to ">=",
        "endDate" to "<=",
        "sourceIp" to "!=",
        "destinationIp" to "!=",
        "protocol" to "!=",
        "sourcePort" to "!=",
    )

    fun map(variableName: String): String {
        if (variableName.startsWith("only_"))
            return "="
        return operationMap[variableName] ?: throw IllegalArgumentException("No operation for variable $variableName")
    }
}
