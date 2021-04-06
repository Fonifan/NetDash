package com.netdash.rest.data.transformer.model

import com.fasterxml.jackson.annotation.JsonValue

enum class DataType(private val type: String) {
    BAR("bar"),
    FLAT("flat"),
    SANKEY("sankey");

    @JsonValue
    fun getType(): String {
        return type;
    }
}
