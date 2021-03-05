package com.netdash.rest.transformer.model

data class TransformerMapping(private val map: HashMap<String, String>) {
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
}
