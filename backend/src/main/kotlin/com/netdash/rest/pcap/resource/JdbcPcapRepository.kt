package com.netdash.rest.pcap.resource

import com.netdash.rest.pcap.model.PcapDescriptor
import com.netdash.rest.pcap.repository.PcapDescriptorRowMapper
import com.netdash.rest.pcap.repository.TableIdentifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
open class JdbcPcapRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
) {

    fun getAllDescriptors(): Collection<PcapDescriptor> {
        return jdbcTemplate.query(
            "select name, count(*), 'conversation' as type from conversation group by name, type\n" +
                    "union all\n" +
                    "select name, count(*), 'domain' as type from domain group by name, type\n" +
                    "union all\n" +
                    "select name, count(*), 'encrypted' as type from encrypted group by name, type\n" +
                    "union all\n" +
                    "select name, count(*), 'file' as type from file group by name, type",
            PcapDescriptorRowMapper()).toList()
    }

    fun delete(name: String, tableIdentifier: TableIdentifier): Boolean {
        return jdbcTemplate.update("drop table ${tableIdentifier.short}_${name} cascade ") == 1
    }
}
