package com.netdash.rest.transformer.model

data class TransformMetaData(
    val pcapName: String,
    val bucketized: Boolean,
    val type: TransformerType,
    val mapping: TransformerMapping,
)
