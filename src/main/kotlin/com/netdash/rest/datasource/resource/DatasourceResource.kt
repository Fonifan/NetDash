package com.netdash.rest.datasource.resource

import com.netdash.rest.datasource.serialization.DatasourceMetadata
import com.netdash.rest.datasource.service.DatasourceService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/datasource")
class DatasourceResource(private val datasourceService: DatasourceService) {

    private val logger = LoggerFactory.getLogger(javaClass)

    @GetMapping
    fun findAll(): List<DatasourceMetadata> {
        return datasourceService.findAll()
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable id: String): ResponseEntity<DatasourceMetadata> {

        val datasourceMetadata = datasourceService.findById(id.toLong())
        logger.debug(datasourceMetadata.toString())
        if (datasourceMetadata == null)
            return ResponseEntity.notFound().build()

        return ResponseEntity.ok(datasourceMetadata)
    }

    @PostMapping
    fun createDatasource(@RequestBody metadata: DatasourceMetadata): Long {
        return datasourceService.save(metadata)
    }

    @PatchMapping("/{id}")
    fun updateDatasource(@RequestBody metadata: DatasourceMetadata, @PathVariable id: String): ResponseEntity<Unit> {
        if (datasourceService.update(id.toLong(), metadata)) {
            return ResponseEntity.noContent().build()
        }

        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/{id}")
    fun deleteDatasource(@PathVariable id: String): ResponseEntity<Unit> {
        if (datasourceService.delete(id.toLong())) {
            return ResponseEntity.noContent().build()
        }

        return ResponseEntity.notFound().build()
    }

}
