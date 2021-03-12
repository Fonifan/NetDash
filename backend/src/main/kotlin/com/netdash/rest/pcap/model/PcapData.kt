package com.netdash.rest.pcap.model

data class PcapData(val name: String, val pcapData: List<ConsumedPacket>) :
    Data(pcapData.map { packet -> DynamicPacket(packet).data }) 
