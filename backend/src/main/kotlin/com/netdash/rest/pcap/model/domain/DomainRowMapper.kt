import com.netdash.rest.pcap.model.domain.DomainPacket
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class DomainRowMapper : RowMapper<DomainPacket> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): DomainPacket {
        return DomainPacket(
            resultSet.getLong("timestamp"),
            resultSet.getBoolean("alexa"),
            resultSet.getString("client"),
            resultSet.getString("dga"),
            resultSet.getString("category"),
            resultSet.getString("domain"),
            resultSet.getString("status"),
            resultSet.getString("flowkey"),
            resultSet.getString("resolvedto"),
            resultSet.getLong("rtt"),
            resultSet.getString("server"),
            resultSet.getString("name"),
        )
    }
}
