package com.netdash.rest.data.variable

import com.netdash.rest.data.model.DataRequestVariables
import com.netdash.rest.pcap.repository.TableIdentifier

class VariableBuilder(private val variables: DataRequestVariables, private val tableIdentifier: TableIdentifier) {
    private val columnMapper = VariableToColumnMapper(tableIdentifier)
    private val operationMapper = OperationMapper()
    private val valueWrapper = ValueWrapper();
    fun build(): String {
        val stringBuilder = StringBuilder()
        variables.vars.forEachIndexed { idx, entry ->
            val variableName = entry.name
            val columnName = columnMapper.map(variableName)
            stringBuilder.append(columnName)
            stringBuilder.append(operationMapper.map(variableName))
            stringBuilder.append(valueWrapper.wrap(columnName, entry.value))
            if (idx + 1 == variables.vars.size)
                stringBuilder.append("\n")
            else
                stringBuilder.append(" and\n")
        }
        return stringBuilder.toString()
    }
}
