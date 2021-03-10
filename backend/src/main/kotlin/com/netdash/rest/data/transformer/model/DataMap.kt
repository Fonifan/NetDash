package com.netdash.rest.data.transformer.model

data class DataMap(private val map: Map<String, String>) {
    val aggregator: String
        get() {
            return map["aggregator"] ?: throw IllegalArgumentException("Access to invalid aggregator mapping")
        }
    val qualifier: String
        get() {
            return map["qualifier"] ?: throw IllegalArgumentException("Access to invalid qualifier mapping")
        }
    val quantifier: String
        get() {
            return map["quantifier"] ?: throw IllegalArgumentException("Access to invalid quantifier mapping")
        }

    val size: Int
        get() = map.size

    val values: Collection<String>
        get() {
            return map.values
        }
}
