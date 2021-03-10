package com.netdash.rest.data.transformer.service

import com.netdash.rest.pcap.model.Data

interface Transformer {
    fun transform(data: Data): TransformedData
}
