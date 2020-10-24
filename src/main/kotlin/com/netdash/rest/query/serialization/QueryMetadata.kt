package com.netdash.rest.query.serialization

data class QueryMetadata(
        val query: String,
        val queryParameters: QueryParameters? = null,
        val mapping: Mapping,
        val datasourceId: Long
)
