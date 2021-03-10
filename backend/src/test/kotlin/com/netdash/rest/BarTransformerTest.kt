package com.netdash.rest

import com.netdash.rest.pcap.model.ConsumedPacket
import com.netdash.rest.pcap.model.PcapData
import com.netdash.rest.data.transformer.service.bar.BarTransformedData
import com.netdash.rest.data.transformer.service.flat.BarTransformer
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test


class BarTransformerTest {
    private var transformer: BarTransformer = BarTransformer("packetTime", "sourceIp", "octets")
    private var pcapData: PcapData = PcapData("a", listOf(
        ConsumedPacket("192.168.0.1", "192.168.0.2", 1, 2, 1000, "tcp", 10),
        ConsumedPacket("192.168.0.2", "192.168.0.3", 1, 2, 1000, "tcp", 10),
        ConsumedPacket("192.168.0.1", "192.168.0.2", 1, 2, 2000, "tcp", 10),
    ))
    private var expected = BarTransformedData(mapOf(
        "1000" to mapOf("192.168.0.1" to "10", "192.168.0.2" to "10"),
        "2000" to mapOf("192.168.0.1" to "10"),
    ))


    @Test
    fun basic() {
        Assertions.assertEquals(transformer.transform(pcapData), expected)
    }
}
