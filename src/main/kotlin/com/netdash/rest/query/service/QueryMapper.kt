package com.netdash.rest.query.service

import com.netdash.rest.query.serialization.DataEntry
import com.netdash.rest.query.serialization.DataObject
import com.netdash.rest.query.serialization.Mapping
import com.netdash.rest.query.serialization.QueryMapping
import java.sql.ResultSet
import java.util.*

class QueryMapper(private val mapping: Mapping) {
    fun map(rs: ResultSet): DataObject {
        val obj = ArrayList<DataEntry>(mapping.fields.size)
        mapping.fields.forEach { queryMapping: QueryMapping -> obj.add(DataEntry(queryMapping.target, rs.getObject(queryMapping.source))) }
        return DataObject(obj)
    }
}
