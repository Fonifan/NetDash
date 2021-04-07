package com.netdash.rest.pcap.bucket.service

import com.netdash.rest.pcap.bucket.model.BucketizationRequest
import com.netdash.rest.pcap.repository.TableIdentifier

interface BucketService {
    fun bucketize(bucketizationRequest: BucketizationRequest) : Long

    fun getViewName(tableIdentifier: TableIdentifier, bucketizationRequest: BucketizationRequest): String {
        return "${tableIdentifier.short}_${bucketizationRequest.pcapName}_bucket_${bucketizationRequest.bucketSize}"
    }
}
