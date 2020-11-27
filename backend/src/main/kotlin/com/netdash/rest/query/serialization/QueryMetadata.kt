package com.netdash.rest.query.serialization

import com.netdash.rest.query.mapping.serialization.Mapping

data class QueryMetadata(
        val query: String,
        val queryParameters: Map<String, Any>? = null,
        val mapping: Mapping,
        val datasourceId: Long
)
