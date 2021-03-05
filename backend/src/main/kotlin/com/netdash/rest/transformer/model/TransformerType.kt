package com.netdash.rest.transformer.model

import com.fasterxml.jackson.annotation.JsonValue

enum class TransformerType(private val type: String) {
    BAR("bar");

    @JsonValue
    fun getType(): String {
        return type;
    }
}
