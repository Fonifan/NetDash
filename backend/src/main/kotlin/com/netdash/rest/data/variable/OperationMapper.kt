package com.netdash.rest.data.variable

class OperationMapper {
    private val operationMap = mapOf(
        "startDate" to ">=",
        "endDate" to "<="
    )

    fun map(variableName: String): String {
        return operationMap[variableName] ?: throw IllegalArgumentException("No operation for variable $variableName")
    }
}
