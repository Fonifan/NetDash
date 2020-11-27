package com.netdash.rest.datasource

import com.netdash.rest.datasource.repository.JdbcDatasourceRepository
import com.netdash.rest.datasource.service.DatasourceBuilder
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Component

@Component
class DatasourceTemplateCache(private val datasourceRepository: JdbcDatasourceRepository) {
    private val templateMap: HashMap<Long, NamedParameterJdbcTemplate> = HashMap()

    fun get(id: Long): NamedParameterJdbcTemplate {
        return templateMap.getOrPut(id, {
            val metadata = datasourceRepository.findById(id)
                    ?: throw IllegalArgumentException("Can't find Datasource with id $id")
            DatasourceBuilder(metadata).jdbcTemplate
        })
    }

    fun remove(id: Long) {
        templateMap.remove(id)
    }
}
