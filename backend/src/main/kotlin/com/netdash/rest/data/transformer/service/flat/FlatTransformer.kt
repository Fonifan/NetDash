package com.netdash.rest.data.transformer.service.flat

import com.netdash.rest.data.transformer.service.Transformer
import com.netdash.rest.pcap.model.Data

class FlatTransformer(
    private val qualifier: String,
    private val quantifier: String,
) :
    Transformer {
    private val collector: MutableCollection<Map<String, Any>> = mutableListOf()

    override fun transform(data: Data): Data {
        data.data.forEach { row ->
            val qualifierValue = row[qualifier] ?: throw IllegalArgumentException("Can't get qualifier $qualifier from $row")
            val quantifierValue = row[quantifier] ?: throw IllegalArgumentException("Can't get quantifier $quantifier from $row")

            collector.add(mapOf(
                qualifier to qualifierValue,
                quantifier to quantifierValue
            ))
        }

        return Data(collector)
    }
}
