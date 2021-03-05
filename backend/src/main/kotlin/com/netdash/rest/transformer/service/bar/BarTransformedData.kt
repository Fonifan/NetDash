package com.netdash.rest.transformer.service.bar

import com.netdash.rest.transformer.service.TransformedData

class BarTransformedData(private val data: Map<String, Map<String, String>>) : TransformedData {
    override fun getData(): Map<String, Any> {
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
