package com.netdash.rest.data.transformer.service.chord

import com.netdash.rest.data.transformer.service.Transformer
import com.netdash.rest.pcap.model.Data

class ChordTransformer(
    private val qualifier: String,
    private val quantifier: String,
    private val aggregator: String,
) : Transformer {
    private val nodes = mutableSetOf<String>()
    private val linkMatrix = mutableListOf<List<Long>>()

    override fun transform(data: Data): Data {
        createNodes(data)
        nodes.forEach { node -> linkMatrix.add(createMatrix(node, data)) }
        return Data(mergeNodesLinks())
    }

    private fun createNodes(data: Data) {
        data.data.forEach { map ->
            val qualifierValue = map[qualifier].toString()
            val quantifierValue = map[quantifier].toString()
            nodes.add(qualifierValue)
            nodes.add(quantifierValue)
        }
    }

    private fun createMatrix(node: String, data: Data): List<Long> {
        val matrixRow = MutableList(nodes.size) { 0L }
        nodes.forEachIndexed { idx, otherNode ->
            data.data.forEach { map ->
                val qualifierValue = map[qualifier].toString()
                val quantifierValue = map[quantifier].toString()
                val aggregatorValue = map[aggregator].toString().toLong()
                if (qualifierValue == node && quantifierValue == otherNode)
                    matrixRow[idx] += aggregatorValue
            }
        }
        return matrixRow
    }

    private fun mergeNodesLinks(): Collection<Map<Any, Any>> {
        return nodes.mapIndexed { idx, node ->
            mapOf(
                node to linkMatrix[idx]
            )
        }
    }
}
