package com.netdash.rest.pcap.service

import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Path

@Service
class FileService {
    private val tempDirPath = System.getProperty("java.io.tmpdir")

    fun store(file: MultipartFile): Path {
        val storedFile = File(tempDirPath + file.originalFilename)
        file.transferTo(storedFile)
        return storedFile.toPath()
    }

    fun delete(filePath: Path) {
        filePath.toFile().delete()
    }
}
