package com.netdash.rest.transformer.service

import com.netdash.rest.pcap.model.PcapData

interface Transformer {
    fun transform(pcapData: PcapData): TransformedData
}
