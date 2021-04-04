package com.netdash.rest.pcap.repository

import com.netdash.rest.pcap.model.Data

interface PcapRepository {
    fun findByName(name: String, bucketized: Boolean): Data?

    fun save(pcapData: Data)

    fun delete(name: String): Boolean

    val tableIdentifier: TableIdentifier
}
