package com.netdash.rest.datasource.serialization

data class DatasourceMetadata(
        val userName: String,
        val password: String,
        val url: String,
        val type: DatasourceType,
        val id: Int? = null
);
