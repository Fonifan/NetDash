package com.netdash.rest.query.mapping

import com.fasterxml.jackson.annotation.JsonValue

enum class MappingType(private val type: String) {
    FLAT("flat"),
    LINE_CHART("lineChart");

    @JsonValue
    fun getType(): String {
        return type
    }
}
