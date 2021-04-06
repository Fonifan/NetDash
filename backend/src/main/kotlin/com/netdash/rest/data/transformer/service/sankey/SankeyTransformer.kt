package com.netdash.rest.data.transformer.service.sankey

import com.netdash.rest.data.transformer.service.Transformer
import com.netdash.rest.pcap.model.Data

class SankeyTransformer(
    private val qualifier: String,
    private val quantifier: String,
    private val aggregator: String,
) : Transformer {
    private val nodes: MutableSet<SankeyNode> = HashSet()
    private val links: MutableList<SankeyLink> = mutableListOf()

    override fun transform(data: Data): Data {
        data.data.forEach { map ->
            val qualifierValue = map[qualifier].toString()
            val quantifierValue = map[quantifier].toString()
            val aggregatorValue = map[aggregator] ?: throw IllegalArgumentException("Can't get quantifier $quantifier from $map")
            nodes.add(SankeyNode(qualifierValue))
            nodes.add(SankeyNode(quantifierValue))
            links.add(SankeyLink(qualifierValue, quantifierValue, aggregatorValue))
        }

        return Data(listOf(mapOf(
            "nodes" to nodes,
            "links" to links
        )))
    }
}
