package com.netdash.rest.query.serialization

data class QueryData(
        val dataObjects: List<DataObject>
)

data class DataObject(
        val fields: Map<String, *>
)

