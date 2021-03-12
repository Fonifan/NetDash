package com.netdash.rest.data.transformer.service.bar

import com.netdash.rest.data.transformer.service.Transformer
import com.netdash.rest.pcap.model.Data

class BarTransformer(
    private val aggregator: String,
    private val qualifier: String,
    private val quantifier: String,
) :
    Transformer {
    private val collector: MutableMap<String, MutableMap<String, Any>> = HashMap()

    override fun transform(data: Data): Data {
        data.data.forEach { row ->
            val aggregatorValue = row[aggregator].toString()
            val qualifierValue = row[qualifier].toString()
            val quantifierValue = row[quantifier] ?: throw IllegalArgumentException("Can't get quantifier $quantifier from $row")

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

    private fun collectData(): Data {
        return Data(
            collector.map { entry ->
                entry.value[aggregator] = entry.key
                entry.value
            }.toList().sortedBy { map -> map[aggregator] as Comparable<Any> }
        )
    }
}
