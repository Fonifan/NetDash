package com.netdash.rest.data.variable

import com.netdash.rest.data.model.DataRequestVariables
import com.netdash.rest.pcap.repository.TableIdentifier

class VariableBinder(
    private val query: String,
    private val variables: DataRequestVariables,
    private val tableIdentifier: TableIdentifier,
) {
    private val whereRegex: Regex = "/\\*.*where.*\\*/".toRegex()
    private val andRegex: Regex = "/\\*.*and.*\\*/".toRegex()
    fun bind(): String {
        val findWhere = whereRegex.find(query)
        val findAnd = andRegex.find(query)
        if (findWhere != null && findAnd != null)
            throw IllegalArgumentException("Can't have 2 query hints in $query")

        if (findWhere != null) {
            return bindWhere();
        }
        if (findAnd != null) {
            return bindAnd()
        }

        return query
    }

    private fun bindWhere(): String {
        val builder = VariableBuilder(this.variables, tableIdentifier)
        return query.replace(whereRegex, " WHERE ${builder.build()} ")
    }

    private fun bindAnd(): String {
        val builder = VariableBuilder(this.variables, tableIdentifier)
        return query.replace(andRegex, " AND ${builder.build()} ")
    }
}
