package com.netdash.rest.query.serialization

data class Mapping(
        val fields: List<QueryMapping>
)

data class QueryMapping(
        val source: String,
        val target: String
)
