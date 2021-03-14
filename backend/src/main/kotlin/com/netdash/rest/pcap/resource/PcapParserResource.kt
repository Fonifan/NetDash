package com.netdash.rest.pcap.resource

import com.netdash.rest.pcap.repository.PcapRepository
import com.netdash.rest.pcap.service.FileService
import com.netdash.rest.pcap.service.PcapParserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/pcap")
class PcapParserResource(
    private val pcapParserService: PcapParserService,
    private val fileService: FileService,
    private val pcapRepository: PcapRepository
) {

    @PostMapping
    fun parsePcapFile(@RequestParam("file") file: MultipartFile): ResponseEntity<Int> {
        val path = fileService.store(file)
        val pcapData = pcapParserService.parse(path, file.originalFilename!!)
        pcapRepository.save(pcapData)
        fileService.delete(path)
        return ResponseEntity.ok(pcapData.pcapData.size)
    }
}
