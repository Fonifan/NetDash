package com.netdash.rest.pcap.model.encrypted

import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.DynamicPacket

data class EncryptedData(val name: String, val pcapData: List<EncryptedPacket>) :
    Data(pcapData.map { packet -> DynamicPacket(packet).data })
