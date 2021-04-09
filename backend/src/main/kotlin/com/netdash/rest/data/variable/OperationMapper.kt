package com.netdash.rest.data.variable

class OperationMapper {
    private val operationMap = mapOf(
        "startDate" to ">=",
        "endDate" to "<=",
        "sourceIp" to "!=",
        "destinationIp" to "!=",
        "only_sourceIp" to "=",
        "only_destinationIp" to "=",
    )

    fun map(variableName: String): String {
        return operationMap[variableName] ?: throw IllegalArgumentException("No operation for variable $variableName")
    }
}
