package com.netdash.rest.pcap.model.file

import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.DynamicPacket

data class FileData(val name: String, val pcapData: List<FilePacket>) :
    Data(pcapData.map { packet -> DynamicPacket(packet).data })
