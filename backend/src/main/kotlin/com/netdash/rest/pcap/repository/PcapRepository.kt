package com.netdash.rest.pcap.repository

import com.netdash.rest.pcap.model.PcapData
import org.springframework.stereotype.Repository

@Repository
interface PcapRepository {
    fun findByName(name: String, bucketized: Boolean): PcapData?
    
    fun save(pcapData: PcapData)

    fun delete(name: String): Boolean

    companion object {
        const val PCAP_TABLE = "pcap"
    }
}
