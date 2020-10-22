package com.netdash.rest.query.serialization

data class QueryMetadata(
        val query: String,
        val queryParameters: Map<String, String>,
        val mapping: Map<String, String>
)
