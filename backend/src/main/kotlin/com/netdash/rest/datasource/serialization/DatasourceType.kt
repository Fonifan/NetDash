package com.netdash.rest.datasource.serialization

import com.fasterxml.jackson.annotation.JsonValue

public enum class DatasourceType(val code: String, val driverClassName: String) {
    MY_SQL("mysql", "com.mysql.jdbc.Driver"),
    POSTGRE_SQL("postgresql", "org.postgresql.Driver");

    @JsonValue
    fun getType(): String {
        return code
    }
}
