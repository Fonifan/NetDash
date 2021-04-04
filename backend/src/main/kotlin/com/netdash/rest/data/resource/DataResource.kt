package com.netdash.rest.data.resource

import com.netdash.rest.data.database.QueryExecutionService
import com.netdash.rest.data.model.BatchDataRequestMetaData
import com.netdash.rest.data.model.DataRequestMetaData
import com.netdash.rest.data.transformer.service.TransformerFactory
import com.netdash.rest.pcap.model.Data
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/data")
class DataResource(private val queryExecutionService: QueryExecutionService) {

    @PostMapping
    fun getData(
        @RequestBody dataRequestMetaData: DataRequestMetaData,
    ): ResponseEntity<Data> {
        val data = executeDataRequest(dataRequestMetaData) ?: return ResponseEntity.notFound().build()

        return ResponseEntity.ok(data)
    }

    @PostMapping("/batch")
    fun getBatch(
        @RequestBody batchDataRequestMetaData: BatchDataRequestMetaData,
    ): ResponseEntity<Map<String, Data?>> {
        val dataRequestMap = batchDataRequestMetaData.metaDataMap.entries.associateBy({ it.key }, { executeDataRequest(it.value) })

        return ResponseEntity.ok(dataRequestMap)
    }


    private fun executeDataRequest(dataRequestMetaData: DataRequestMetaData): Data? {
        val data = queryExecutionService.executeQuery(dataRequestMetaData) ?: return null

        return TransformerFactory().getTransformer(dataRequestMetaData).transform(data)
    }
}
