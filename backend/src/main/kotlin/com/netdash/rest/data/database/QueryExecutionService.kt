package com.netdash.rest.data.database

import com.netdash.rest.data.model.DataRequestMetaData
import com.netdash.rest.data.model.DataRequestVariables
import com.netdash.rest.data.variable.VariableBinder
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.repository.DynamicRowMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class QueryExecutionService(@Autowired val jdbcTemplate: JdbcTemplate) {
    fun executeQuery(
        dataRequestMetaData: DataRequestMetaData,
        variables: DataRequestVariables?
    ): Data? {
        val (pcapMetaData, _, dataMap, query) = dataRequestMetaData;
        val tableId = pcapMetaData.tableIdentifier

        var preparedQuery = query.replaceFirst(":pcapName", "\"${tableId.prepareTableName(pcapMetaData)}\"")
        if (variables != null) {
            val variableBinder = VariableBinder(preparedQuery, variables, tableId)
            preparedQuery = variableBinder.bind()
        }
        val data = jdbcTemplate.query(preparedQuery, DynamicRowMapper(dataMap)).toList()

        if (data.isEmpty())
            return null

        return Data(data.map { dynamicPacket -> dynamicPacket.data })
    }

}
