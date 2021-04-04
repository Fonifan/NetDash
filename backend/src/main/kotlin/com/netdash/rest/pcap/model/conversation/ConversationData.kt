package com.netdash.rest.pcap.model.conversation

import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.DynamicPacket

data class ConversationData(val name: String, val pcapData: List<ConversationPacket>) :
    Data(pcapData.map { packet -> DynamicPacket(packet).data })
