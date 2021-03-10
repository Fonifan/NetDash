package com.netdash.rest.data.transformer.service.bar

import com.netdash.rest.data.transformer.service.Transformer
import com.netdash.rest.pcap.model.Data

class BarTransformer(
    private val aggregator: String,
    private val qualifier: String,
    private val quantifier: String,
) :
    Transformer {
    private val collector: MutableMap<String, MutableMap<String, String>> = HashMap()

    override fun transform(data: Data): BarTransformedData {
        data.get().forEach { row ->
            val aggregatorValue = row[aggregator].toString()
            val qualifierValue = row[qualifier].toString()
            val quantifierValue = row[quantifier].toString()

            if (!collector.containsKey(aggregatorValue)) {
                collector[aggregatorValue] = HashMap()
            }
            if (collector.containsKey(aggregatorValue)) {
                val map = collector[aggregatorValue]!!
                map[qualifierValue] = quantifierValue
            }
        }

        return collectData()
    }

    private fun collectData(): BarTransformedData {
        return BarTransformedData(
            collector.map { entry ->
                mapOf(entry.key to entry.value)
            }.toList()
        )
    }
}
