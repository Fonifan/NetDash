package com.netdash.rest.datasource.resource

import com.netdash.rest.datasource.serialization.DatasourceMetadata
import com.netdash.rest.datasource.service.DatasourceService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/datasource")
class DatasourceResource(private val datasourceService: DatasourceService) {
    @GetMapping
    fun getDatasources() : List<DatasourceMetadata> {
        return datasourceService.getAll();
    }

    @PostMapping
    fun createDatasource(@RequestBody metadata: DatasourceMetadata) {

    }

    @PatchMapping("/{id}")
    fun updateDatasource(@PathVariable id: String) {

    }

    @DeleteMapping("/{id}")
    fun deleteDatasource(@PathVariable id: String) {

    }
}
