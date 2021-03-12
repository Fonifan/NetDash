package com.netdash.rest.pcap.repository

import com.netdash.rest.data.transformer.model.DataMap
import com.netdash.rest.pcap.model.Data
import com.netdash.rest.pcap.model.PcapData
import org.springframework.stereotype.Repository

@Repository
interface PcapRepository {
    fun findByName(name: String, bucketized: Boolean): PcapData?

    fun save(pcapData: PcapData)

    fun delete(name: String): Boolean

    fun executeQuery(pcapName: String, bucketized: Boolean, query: String, dataMap: DataMap): Data?

    companion object {
        const val PCAP_TABLE = "pcap"
    }
}
