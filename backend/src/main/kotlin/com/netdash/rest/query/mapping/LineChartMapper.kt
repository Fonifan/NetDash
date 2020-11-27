package com.netdash.rest.query.mapping

import java.sql.ResultSet

class LineChartMapper(private val variables: Map<String, String>) : Mapper {
    private val dataObject: MutableCollection<Map<String, Any>> = mutableListOf()
    private val dataMap: MutableMap<String, MutableCollection<Map<String, Any>>> = mutableMapOf()

    override fun collectRow(resultSet: ResultSet) {
        val id = resultSet.getString(variables["id"])
        val x = resultSet.getObject(variables["x"])
        val y = resultSet.getObject(variables["y"])

        val data = dataMap.getOrPut(id) { mutableListOf() }
        data.add(mapOf("x" to x, "y" to y))
    }

    override fun getData(): Collection<Map<String, Any>> {
        if (dataObject.isEmpty())
            formatData()

        return dataObject
    }

    private fun formatData() {
        dataMap.forEach { (key, value) ->
            dataObject.add(mapOf(
                    "id" to key,
                    "data" to value
            ))
        }
    }
}
