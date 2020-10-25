package com.netdash.rest.query.serialization

data class QueryMetadata(
        val query: String,
        val queryParameters: Map<String, *>? = null,
        val mapping: List<QueryMapping>,
        val datasourceId: Long
)
