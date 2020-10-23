package com.netdash.rest.datasource.serialization

import com.fasterxml.jackson.annotation.JsonProperty

enum class DatasourceType(val code: String) {
    @JsonProperty("mysql")
    MY_SQL("mysql"),

    @JsonProperty("postgresql")
    POSTGRE_SQL("postgresql");
}
