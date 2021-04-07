package com.netdash.rest.pcap.resource

import com.netdash.rest.pcap.bucket.BucketizedPcapDescriptor
import com.netdash.rest.pcap.model.PcapDescriptor
import com.netdash.rest.pcap.repository.PcapDescriptorRowMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
open class JdbcPcapRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) {

    fun getAllDescriptors(): Collection<PcapDescriptor> {
        val pcapDescriptorList = jdbcTemplate.query(
            "select name, count(*), 'conversation' as type from conversation group by name, type\n" +
                    "union all\n" +
                    "select name, count(*), 'domain' as type from domain group by name, type\n" +
                    "union all\n" +
                    "select name, count(*), 'encrypted' as type from encrypted group by name, type\n" +
                    "union all\n" +
                    "select name, count(*), 'file' as type from file group by name, type",
            PcapDescriptorRowMapper()
        ).toList()
        expandViews(pcapDescriptorList);
        return pcapDescriptorList
    }

    private fun expandViews(pcapDescriptorList: List<PcapDescriptor>) {
        pcapDescriptorList.forEach {
            it.variants.addAll(getViews(it.name))
        }
    }

    private fun getViews(name: String): List<BucketizedPcapDescriptor> {
        val query =
            "select relname as name, reltuples as packetsCount\n" +
                    "from pg_class\n" +
                    "where relkind = 'm' and relname like '%${name}%';"
        return jdbcTemplate.query(query) { rs, rowNum ->
            val bucketSize = parseBucketSizeFromView(rs.getString("name"))
            val packetsCount = rs.getLong("packetscount");
            BucketizedPcapDescriptor(
                bucketSize,
                packetsCount,
            )
        }
    }

    private fun parseBucketSizeFromView(viewName: String): Long {
        val split = viewName.split("_")
        return split[split.size - 1].toLong()
    }
}
