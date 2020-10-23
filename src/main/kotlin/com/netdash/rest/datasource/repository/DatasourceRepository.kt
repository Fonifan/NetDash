package com.netdash.rest.datasource.repository

import com.netdash.rest.datasource.serialization.DatasourceMetadata
import org.springframework.stereotype.Repository

@Repository
interface DatasourceRepository {
    fun findAll(): List<DatasourceMetadata>

    fun findById(id: Long): DatasourceMetadata?

    fun save(datasourceMetadata: DatasourceMetadata): Long

    fun update(id: Long, datasourceMetadata: DatasourceMetadata): Boolean

    fun delete(id: Long): Boolean
}
