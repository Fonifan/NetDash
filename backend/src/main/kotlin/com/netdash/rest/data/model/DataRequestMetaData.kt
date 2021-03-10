package com.netdash.rest.data.model

import com.netdash.rest.data.transformer.model.DataMap
import com.netdash.rest.data.transformer.model.DataType

data class DataRequestMetaData(
    val pcapName: String,
    val bucketized: Boolean,
    val type: DataType,
    val mapping: DataMap,
    val query: String?
)
