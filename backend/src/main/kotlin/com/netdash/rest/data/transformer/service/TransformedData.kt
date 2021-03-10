package com.netdash.rest.data.transformer.service

interface TransformedData {
    fun getData(): Collection<Map<String, Any>>
}
