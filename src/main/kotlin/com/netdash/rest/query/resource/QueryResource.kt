package com.netdash.rest.query.resource

import com.netdash.rest.query.serialization.QueryMetadata
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/query")
class QueryResource {
    @PostMapping
    fun executeQuery(@RequestBody queryMetaData: QueryMetadata): QueryMetadata {
        return queryMetaData;
    }
}
