package com.netdash.rest.pcap.bucket.service.impl

import com.netdash.rest.pcap.bucket.model.BucketizationRequest
import com.netdash.rest.pcap.bucket.service.BucketService
import com.netdash.rest.pcap.repository.TableIdentifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.ResultSetExtractor
import org.springframework.stereotype.Service

@Service
open class ConversationBucketService(@Autowired private val jdbcTemplate: JdbcTemplate) : BucketService {
    override fun bucketize(bucketizationRequest: BucketizationRequest): Long {
        val (pcapName, bucketSize) = bucketizationRequest;
        val tableIdentifier = TableIdentifier.CONVERSATION
        val newViewName = this.getViewName(tableIdentifier, bucketizationRequest)
        jdbcTemplate.execute(
            "create materialized view \"$newViewName\" as\n" +
                    "        select sourceip, destinationip, sourceport, destinationport, pt as packettime, protocol, sum as octets, name\n" +
                    "          from (\n" +
                    "              select sourceip, destinationip, sourceport, destinationport, time_bucket($bucketSize, packettime) as pt, protocol,\n" +
                    "                     sum(octets), name\n" +
                    "                from \"${tableIdentifier.prepareTableName(pcapName, false)}\"\n" +
                    "               group by sourceip, destinationip, sourceport, destinationport, pt, protocol, name\n" +
                    "               order by pt\n" +
                    "          ) as sub"
        )
        val size = jdbcTemplate.query(
            "select count(*) as cnt from \"${newViewName}\"",
            ResultSetExtractor { rs ->
                rs.next()
                rs.getLong("cnt")
            })

        return size
    }
}

