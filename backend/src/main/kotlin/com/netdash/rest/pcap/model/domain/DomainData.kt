package com.netdash.rest.pcap.model.domain

import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.DynamicPacket

data class DomainData(val name: String, val pcapData: List<DomainPacket>) :
    Data(pcapData.map { packet -> DynamicPacket(packet).data })
