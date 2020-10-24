package com.netdash.rest.query.serialization

data class QueryMetadata(
        val query: String,
        val queryParameters: List<Any>,
        val mapping: Mapping,
        val datasourceId: Long
)
