package com.netdash.rest.query.resource

import com.netdash.rest.query.serialization.QueryMetadata
import com.netdash.rest.query.service.QueryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/query")
class QueryResource(private val queryService: QueryService) {
    @PostMapping
    fun executeQuery(@RequestBody queryMetaData: QueryMetadata): ResponseEntity<Collection<Map<String, Any>>> {
        return ResponseEntity.ok(queryService.executeQuery(queryMetaData))
    }
}
