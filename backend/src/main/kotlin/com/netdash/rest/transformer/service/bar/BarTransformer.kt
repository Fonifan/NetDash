package com.netdash.rest.transformer.service.bar

import com.netdash.rest.pcap.model.PcapData
import com.netdash.rest.transformer.service.Transformer

class BarTransformer(
    private val aggregator: String,
    private val qualifier: String,
    private val quantifier: String,
) :
    Transformer {
    private val collector: MutableMap<String, MutableMap<String, String>> = HashMap()

    override fun transform(pcapData: PcapData): BarTransformedData {
        pcapData.data.forEach { packet ->
            val aggregatorValue = packet.get(aggregator)
            val qualifierValue = packet.get(qualifier)
            val quantifierValue = packet.get(quantifier)

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
        return BarTransformedData(collector)
    }
}
