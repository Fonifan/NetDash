package com.netdash.rest.datasource.service

import com.netdash.rest.datasource.repository.DatasourceRepository
import com.netdash.rest.datasource.serialization.DatasourceMetadata
import org.springframework.stereotype.Service

@Service
class DatasourceService(private val datasourceRespository: DatasourceRepository) {
    fun getAll(): List<DatasourceMetadata> {
        TODO("Not yet implemented")
    }

}
