package com.netdash.rest.query.service

import com.netdash.rest.datasource.DatasourceTemplateCache
import com.netdash.rest.query.mapping.MapperFactory
import com.netdash.rest.query.serialization.QueryMetadata
import org.springframework.stereotype.Service
import java.sql.ResultSet

@Service
class QueryService(private val datasourceTemplateCache: DatasourceTemplateCache) {
    private val mapperFactory: MapperFactory = MapperFactory()

    public fun executeQuery(metaData: QueryMetadata): Collection<Map<String, Any>> {
        val jdbcTemplate = datasourceTemplateCache.get(metaData.datasourceId)
        val mapper = mapperFactory.create(metaData.mapping)

        if (metaData.queryParameters == null || metaData.queryParameters.isEmpty()) {
            jdbcTemplate.query(metaData.query) { rs: ResultSet, _: Int ->
                mapper.collectRow(rs)
            }
        } else {
            jdbcTemplate.query(metaData.query, metaData.queryParameters) { rs: ResultSet, _: Int ->
                mapper.collectRow(rs)
            }
        }

        return mapper.getData()
    }
}

