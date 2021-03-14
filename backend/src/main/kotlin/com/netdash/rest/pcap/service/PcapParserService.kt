package com.netdash.rest.pcap.service

import com.netdash.rest.pcap.model.PcapData
import org.jnetpcap.Pcap
import org.springframework.stereotype.Service
import java.nio.file.Path

@Service
open class PcapParserService {

    fun parse(filePath: Path, originalFilename: String): PcapData {
        val errorBuffer = StringBuilder()
        val pcap = Pcap.openOffline(filePath.toString(), errorBuffer)
        val packetParser = PacketParser(originalFilename)
        pcap.loop(Pcap.LOOP_INFINITE, packetParser, errorBuffer)
        pcap.close()
        return packetParser.getData()
    }
}
