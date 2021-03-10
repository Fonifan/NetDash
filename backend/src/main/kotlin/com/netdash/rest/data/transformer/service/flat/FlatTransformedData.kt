package com.netdash.rest.data.transformer.service.flat

import com.netdash.rest.data.transformer.service.TransformedData

class FlatTransformedData(private val data: Collection<Map<String, String>>) : TransformedData {
    override fun getData(): Collection<Map<String, Any>> {
        return data
    }
}
