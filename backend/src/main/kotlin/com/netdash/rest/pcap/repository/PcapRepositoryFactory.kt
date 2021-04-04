package com.netdash.rest.pcap.repository

import com.netdash.rest.pcap.repository.impl.JdbcConversationRepository
import com.netdash.rest.pcap.repository.impl.JdbcDomainRepository
import com.netdash.rest.pcap.repository.impl.JdbcEncryptedRepository
import com.netdash.rest.pcap.repository.impl.JdbcFileRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PcapRepositoryFactory(
    @Autowired val conversationRepository: JdbcConversationRepository,
    @Autowired val fileRepository: JdbcFileRepository,
    @Autowired val encryptedRepository: JdbcEncryptedRepository,
    @Autowired val domainRepository: JdbcDomainRepository,
) {
    fun get(tableIdentifier: TableIdentifier): PcapRepository = when (tableIdentifier) {
        TableIdentifier.CONVERSATION -> conversationRepository
        TableIdentifier.FILE -> fileRepository
        TableIdentifier.ENCRYPTED -> encryptedRepository
        TableIdentifier.DOMAIN -> domainRepository
    }
}
