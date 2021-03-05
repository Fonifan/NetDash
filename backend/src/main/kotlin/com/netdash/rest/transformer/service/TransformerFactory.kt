package com.netdash.rest.transformer.service

import com.netdash.rest.transformer.model.TransformMetaData
import com.netdash.rest.transformer.model.TransformerType
import com.netdash.rest.transformer.service.bar.BarTransformer

class TransformerFactory {
    fun getTransformer(transformMetaData: TransformMetaData): Transformer {
        when (transformMetaData.type) {
            TransformerType.BAR -> return BarTransformer(
                transformMetaData.mapping.aggregator,
                transformMetaData.mapping.qualifier,
                transformMetaData.mapping.quantifier
            )
            else -> throw IllegalArgumentException("Unexpected transformer type: ${transformMetaData.type}")
        }
    }
}
