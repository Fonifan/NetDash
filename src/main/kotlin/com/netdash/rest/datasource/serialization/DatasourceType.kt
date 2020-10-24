package com.netdash.rest.datasource.serialization

import com.fasterxml.jackson.annotation.JsonProperty

public enum class DatasourceType(val code: String, val driverClassName: String) {
    @JsonProperty("mysql")
    MY_SQL("mysql", "com.mysql.jdbc.Driver"),

    @JsonProperty("postgresql")
    POSTGRE_SQL("postgresql", "org.postgresql.Driver");
}
