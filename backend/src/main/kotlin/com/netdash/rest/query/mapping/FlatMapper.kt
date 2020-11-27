package com.netdash.rest.query.mapping

import java.sql.ResultSet

class FlatMapper(private val variables: Map<String, String>) : Mapper {
    private val dataObject: MutableCollection<Map<String, Any>> = mutableListOf()

    override fun collectRow(resultSet: ResultSet) {
        val obj = HashMap<String, Any>(variables)
        variables.forEach { field -> obj[field.key] = resultSet.getObject(field.value) }
        dataObject.add(obj)
    }

    override fun getData(): Collection<Map<String, Any>> {
        return dataObject
    }

}
