package com.netdash.rest.data.model

import com.netdash.rest.pcap.repository.TableIdentifier

data class PcapMetaData(
    val datasourceName: String,
    val isBucketizationEnabled: Boolean,
    val bucketSize: Long?,
    val tableIdentifier: TableIdentifier
)
