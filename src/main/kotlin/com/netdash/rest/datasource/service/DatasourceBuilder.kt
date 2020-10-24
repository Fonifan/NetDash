package com.netdash.rest.datasource.service

import com.netdash.rest.datasource.serialization.DatasourceMetadata
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import javax.sql.DataSource

class DatasourceBuilder(datasourceMetadata: DatasourceMetadata) {
    val datasource: DataSource = DataSourceBuilder
            .create()
            .username(datasourceMetadata.userName)
            .password(datasourceMetadata.password)
            .url(datasourceMetadata.url)
            .driverClassName(datasourceMetadata.type.driverClassName)
            .build()

    val jdbcTemplate: NamedParameterJdbcTemplate = NamedParameterJdbcTemplate(datasource)
}

