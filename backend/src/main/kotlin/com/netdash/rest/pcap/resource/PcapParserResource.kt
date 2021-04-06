package com.netdash.rest.pcap.resource

import com.netdash.rest.pcap.model.PcapDescriptor
import com.netdash.rest.pcap.repository.PcapRepositoryFactory
import com.netdash.rest.pcap.repository.TableIdentifier
import com.netdash.rest.pcap.service.FileService
import com.netdash.rest.pcap.service.PcapParserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/pcap")
class PcapParserResource(
    private val pcapParserService: PcapParserService,
    private val fileService: FileService,
    private val pcapRepositoryFactory: PcapRepositoryFactory,
    private val allPcapRepository: JdbcPcapRepository,
) {

    @PostMapping
    fun parsePcapFile(
        @RequestParam("file") file: MultipartFile,
        @RequestParam("type") tableIdentifier: String,
    ): ResponseEntity<Int> {
        val path = fileService.store(file)
        val pcapData = pcapParserService.parse(path, file.originalFilename!!)
        pcapRepositoryFactory.get(TableIdentifier.from(tableIdentifier)).save(pcapData)
        fileService.delete(path)
        return ResponseEntity.ok(pcapData.pcapData.size)
    }

    @GetMapping
    fun getAll(): ResponseEntity<Collection<PcapDescriptor>> {
        return ResponseEntity.ok(allPcapRepository.getAllDescriptors())
    }

    @DeleteMapping
    fun delete(@RequestParam name: String, @RequestParam tableIdentifier: String): ResponseEntity<Int> {
        pcapRepositoryFactory.get(TableIdentifier.from(tableIdentifier)).delete(name)
        return ResponseEntity.noContent().build()
    }
}
