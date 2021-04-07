package com.netdash.rest.pcap.model

import com.netdash.rest.pcap.bucket.BucketizedPcapDescriptor
import com.netdash.rest.pcap.repository.TableIdentifier

data class PcapDescriptor(
    val name: String,
    val length: Long,
    val type: TableIdentifier,
    val variants: MutableCollection<BucketizedPcapDescriptor>
    )
