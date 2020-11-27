package com.netdash.rest.query.mapping

import java.sql.ResultSet

interface Mapper {
    fun collectRow(resultSet: ResultSet)

    fun getData(): Collection<Map<String, Any>>
}
