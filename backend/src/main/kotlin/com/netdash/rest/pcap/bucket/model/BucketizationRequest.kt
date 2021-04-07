package com.netdash.rest.pcap.bucket.model

data class BucketizationRequest(
    val pcapName: String,
    val bucketSize: Long
)
