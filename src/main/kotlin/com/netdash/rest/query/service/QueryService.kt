package com.netdash.rest.query.service

import com.netdash.rest.datasource.DatasourceTemplateCache
import com.netdash.rest.query.serialization.QueryMetadata
import org.springframework.stereotype.Service
import java.sql.ResultSet

@Service
class QueryService(private val datasourceTemplateCache: DatasourceTemplateCache) {
    public fun executeQuery(metaData: QueryMetadata): List<Map<String, *>> {
        val jdbcTemplate = datasourceTemplateCache.get(metaData.datasourceId)
        val dataObject = ArrayList<Map<String, *>>()
        val mapper = QueryMapper(metaData.mapping)
        if (metaData.queryParameters == null || metaData.queryParameters.isEmpty()) {
            jdbcTemplate.query(metaData.query) { rs: ResultSet, _: Int ->
                dataObject.add(mapper.map(rs))
            }
        } else {
            jdbcTemplate.query(metaData.query, metaData.queryParameters) { rs: ResultSet, _: Int ->
                dataObject.add(mapper.map(rs))
            }
        }

        return dataObject
    }
}

