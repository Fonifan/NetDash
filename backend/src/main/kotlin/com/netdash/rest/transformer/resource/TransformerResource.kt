package com.netdash.rest.transformer.resource

import com.netdash.rest.pcap.repository.PcapRepository
import com.netdash.rest.transformer.model.TransformMetaData
import com.netdash.rest.transformer.service.TransformerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/transform")
class
TransformerResource(private val pcapRepository: PcapRepository) {

    @PostMapping
    fun transform(
        @RequestBody transformMetaData: TransformMetaData,
    ): ResponseEntity<Map<String, Any>> {
        val pcapData = pcapRepository.findByName(transformMetaData.pcapName, transformMetaData.bucketized) ?: return ResponseEntity.notFound().build()
        val transformedData = TransformerFactory().getTransformer(transformMetaData).transform(pcapData)

        return ResponseEntity.ok(transformedData.getData())
    }
}
