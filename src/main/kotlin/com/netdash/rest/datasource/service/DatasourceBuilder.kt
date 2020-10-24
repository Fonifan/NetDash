package com.netdash.rest.datasource.service

import com.netdash.rest.datasource.serialization.DatasourceMetadata
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.jdbc.core.JdbcTemplate
import javax.sql.DataSource

class DatasourceBuilder(datasourceMetadata: DatasourceMetadata) {
    val datasource: DataSource = DataSourceBuilder
            .create()
            .username(datasourceMetadata.userName)
            .password(datasourceMetadata.userName)
            .url(datasourceMetadata.userName)
            .driverClassName(datasourceMetadata.type.driverClassName)
            .build()

    val jdbcTemplate: JdbcTemplate = JdbcTemplate(datasource)
}

