package com.netdash.rest.data.resource

import com.netdash.rest.data.model.DataRequestMetaData
import com.netdash.rest.data.transformer.service.TransformerFactory
import com.netdash.rest.pcap.repository.PcapRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/data")
class DataResource(private val pcapRepository: PcapRepository) {

    @PostMapping
    fun getData(
        @RequestBody dataRequestMetaData: DataRequestMetaData,
    ): ResponseEntity<Collection<Map<String, Any>>> {
        val data =
            if (dataRequestMetaData.query.isNullOrEmpty())
                pcapRepository.findByName(dataRequestMetaData.pcapName, dataRequestMetaData.bucketized)
            else
                pcapRepository.executeQuery(
                    dataRequestMetaData.pcapName,
                    dataRequestMetaData.bucketized,
                    dataRequestMetaData.query,
                    dataRequestMetaData.mapping
                )

        if (data == null)
            return ResponseEntity.notFound().build()

        val transformedData = TransformerFactory().getTransformer(dataRequestMetaData).transform(data)

        return ResponseEntity.ok(transformedData.getData())
    }
}
