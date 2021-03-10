package com.netdash.rest.data.transformer.service.flat

import com.netdash.rest.data.transformer.service.Transformer
import com.netdash.rest.pcap.model.Data

class FlatTransformer(
    private val qualifier: String,
    private val quantifier: String,
) :
    Transformer {
    private val collector: MutableCollection<Map<String, String>> = mutableListOf()

    override fun transform(data: Data): FlatTransformedData {
        data.get().forEach { row ->
            val qualifierValue = row[qualifier].toString()
            val quantifierValue = row[quantifier].toString()

            collector.add(mapOf(
                qualifier to qualifierValue,
                quantifier to quantifierValue
            ))
        }

        return FlatTransformedData(collector)
    }
}
