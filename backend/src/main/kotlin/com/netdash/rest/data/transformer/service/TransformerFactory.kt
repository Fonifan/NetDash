package com.netdash.rest.data.transformer.service

import com.netdash.rest.data.model.DataRequestMetaData
import com.netdash.rest.data.transformer.model.DataType
import com.netdash.rest.data.transformer.service.bar.BarTransformer
import com.netdash.rest.data.transformer.service.chord.ChordTransformer
import com.netdash.rest.data.transformer.service.flat.FlatTransformer
import com.netdash.rest.data.transformer.service.sankey.SankeyTransformer

class TransformerFactory {
    fun getTransformer(transformMetaData: DataRequestMetaData): Transformer {
        return when (transformMetaData.type) {
            DataType.BAR -> BarTransformer(
                transformMetaData.mapping.aggregator,
                transformMetaData.mapping.qualifier,
                transformMetaData.mapping.quantifier
            )
            DataType.FLAT -> FlatTransformer(
                transformMetaData.mapping.qualifier,
                transformMetaData.mapping.quantifier
            )
            DataType.SANKEY -> SankeyTransformer(
                transformMetaData.mapping.qualifier,
                transformMetaData.mapping.quantifier,
                transformMetaData.mapping.aggregator
            )
            DataType.CHORD -> ChordTransformer(
                transformMetaData.mapping.qualifier,
                transformMetaData.mapping.quantifier,
                transformMetaData.mapping.aggregator
            )
        }
    }
}
