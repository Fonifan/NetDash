package com.netdash.rest.datasource.repository

import com.netdash.rest.datasource.serialization.DatasourceMetadata
import com.netdash.rest.datasource.serialization.DatasourceType
import org.springframework.jdbc.core.RowMapper
import java.sql.ResultSet

class DatasourceRowMapper : RowMapper<DatasourceMetadata> {
    override fun mapRow(rs: ResultSet, rowNum: Int): DatasourceMetadata? {
        return DatasourceMetadata(
                rs.getString("username"),
                rs.getString("password"),
                rs.getString("url"),
                DatasourceType.valueOf(rs.getString("type")),
                rs.getString("name"),
                rs.getLong("id")
        )
    }
}
