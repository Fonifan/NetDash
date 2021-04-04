import com.netdash.rest.pcap.model.file.FilePacket
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class FileRowMapper : RowMapper<FilePacket> {
    override fun mapRow(resultSet: ResultSet, rowNumber: Int): FilePacket {
        return FilePacket(
            resultSet.getLong("timestamp"),
            resultSet.getString("application"),
            resultSet.getString("client"),
            resultSet.getString("contenttype"),
            resultSet.getString("filetype"),
            resultSet.getString("server"),
            resultSet.getLong("contentlength"),
            resultSet.getString("exportedpath"),
            resultSet.getString("filetypemismatch"),
            resultSet.getString("flowkey"),
            resultSet.getString("name")
        )
    }
}
