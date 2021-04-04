import com.netdash.rest.pcap.model.conversation.ConversationPacket
import com.netdash.rest.pcap.model.domain.DomainPacket
import com.netdash.rest.pcap.model.encrypted.EncryptedPacket
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class EncryptedRowMapper : RowMapper<EncryptedPacket> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): EncryptedPacket {
        return EncryptedPacket(
            resultSet.getLong("timestamp"),
            resultSet.getString("client"),
            resultSet.getString("alpn"),
            resultSet.getString("ciphersuite"),
            resultSet.getLong("duration"),
            resultSet.getString("flowkey"),
            resultSet.getLong("fwdrecords"),
            resultSet.getString("ja3client"),
            resultSet.getString("ja3server"),
            resultSet.getLong("revrecords"),
            resultSet.getString("servername"),
            resultSet.getString("version"),
            resultSet.getString("name")
        )
    }
}
