package com.netdash.rest.data.model

data class BatchDataRequestMetaData(
    val metaDataMap: Map<String, DataRequestMetaData>,
    val variables: DataRequestVariables?
)
