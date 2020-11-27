package com.netdash.rest.datasource.service

import com.netdash.rest.datasource.repository.JdbcDatasourceRepository
import com.netdash.rest.datasource.serialization.DatasourceMetadata
import org.springframework.stereotype.Service

@Service
class DatasourceService(private val datasourceRepository: JdbcDatasourceRepository) {
    fun findAll(): List<DatasourceMetadata> = datasourceRepository.findAll()

    fun findById(id: Long): DatasourceMetadata? = datasourceRepository.findById(id)

    fun save(datasourceMetadata: DatasourceMetadata): Long = datasourceRepository.save(datasourceMetadata)

    fun update(id: Long, datasourceMetadata: DatasourceMetadata): Boolean = datasourceRepository.update(id, datasourceMetadata)

    fun delete(id: Long): Boolean = datasourceRepository.delete(id)

}
