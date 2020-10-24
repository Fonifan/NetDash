package com.netdash.rest.query.service

import com.netdash.rest.datasource.DatasourceTemplateCache
import com.netdash.rest.query.serialization.DataObject
import com.netdash.rest.query.serialization.QueryData
import com.netdash.rest.query.serialization.QueryMetadata
import org.springframework.jdbc.core.query
import org.springframework.stereotype.Service
import java.sql.ResultSet

@Service
class QueryService(private val datasourceTemplateCache: DatasourceTemplateCache) {
    public fun executeQuery(metaData: QueryMetadata): QueryData {
        val jdbcTemplate = datasourceTemplateCache.get(metaData.datasourceId)
        val dataObject = ArrayList<DataObject>()
        val mapper = QueryMapper(metaData.mapping)

        jdbcTemplate.query(metaData.query, metaData.queryParameters) { rs: ResultSet, _: Int ->
            dataObject.add(mapper.map(rs))
        }

        return QueryData(dataObject)
    }
}

