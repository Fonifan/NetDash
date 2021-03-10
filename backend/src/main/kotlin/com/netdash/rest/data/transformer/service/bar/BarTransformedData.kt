package com.netdash.rest.data.transformer.service.bar

import com.netdash.rest.data.transformer.service.TransformedData

class BarTransformedData(private val data: Collection<Map<String, Map<String, String>>>) : TransformedData {
    override fun getData(): Collection<Map<String, Any>> {
        return data
    }

    override fun equals(other: Any?): Boolean {
        if (other is BarTransformedData) {
            return other.data == this.data
        }
        return false
    }

    override fun hashCode(): Int {
        return data.hashCode()
    }
}
