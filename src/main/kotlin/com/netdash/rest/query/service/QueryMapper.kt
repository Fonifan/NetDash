package com.netdash.rest.query.service

import com.netdash.rest.query.serialization.QueryMapping
import java.sql.ResultSet
import java.util.*

class QueryMapper(private val mapping: List<QueryMapping>) {
    fun map(rs: ResultSet): Map<String, Any> {
        val obj = HashMap<String, Any>(mapping.size)
        mapping.forEach { queryMapping: QueryMapping -> obj[queryMapping.target] = rs.getObject(queryMapping.source) }
        return obj
    }
}
