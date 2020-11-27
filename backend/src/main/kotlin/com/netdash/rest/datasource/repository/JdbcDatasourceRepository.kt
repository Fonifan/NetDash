package com.netdash.rest.datasource.repository

import com.netdash.rest.TableName
import com.netdash.rest.datasource.serialization.DatasourceMetadata
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.PreparedStatementCreatorFactory
import org.springframework.jdbc.core.SqlParameter
import org.springframework.jdbc.core.simple.SimpleJdbcInsert
import org.springframework.stereotype.Repository
import java.sql.Types

@Repository
class JdbcDatasourceRepository(
        @Autowired val jdbcTemplate: JdbcTemplate
) : DatasourceRepository {

    override fun findAll(): List<DatasourceMetadata> {
        return jdbcTemplate.query("select * from ${TableName.DATASOURCES}", DatasourceRowMapper())
    }

    override fun findById(id: Long): DatasourceMetadata? {
        return jdbcTemplate.query("select * from ${TableName.DATASOURCES} where id=$id", DatasourceRowMapper()).firstOrNull()
    }

    override fun save(datasourceMetadata: DatasourceMetadata): Long {
        val insert = SimpleJdbcInsert(jdbcTemplate).withTableName(TableName.DATASOURCES.toString()).usingGeneratedKeyColumns("id")
        val parameters = HashMap<String, Any>()

        parameters["name"] = datasourceMetadata.name
        parameters["username"] = datasourceMetadata.userName
        parameters["password"] = datasourceMetadata.password
        parameters["url"] = datasourceMetadata.url
        parameters["type"] = datasourceMetadata.type

        return insert.executeAndReturnKey(parameters).toLong()
    }

    override fun update(id: Long, datasourceMetadata: DatasourceMetadata): Boolean {
        val statementCreatorFactory = PreparedStatementCreatorFactory("update ${TableName.DATASOURCES} set name=?, username=?, password=?, url=?, type=? where id = ?")

        statementCreatorFactory.addParameter(SqlParameter("name", Types.VARCHAR))
        statementCreatorFactory.addParameter(SqlParameter("username", Types.VARCHAR))
        statementCreatorFactory.addParameter(SqlParameter("password", Types.VARCHAR))
        statementCreatorFactory.addParameter(SqlParameter("url", Types.VARCHAR))
        statementCreatorFactory.addParameter(SqlParameter("type", Types.VARCHAR))
        statementCreatorFactory.addParameter(SqlParameter("id", Types.INTEGER))

        val statementCreator = statementCreatorFactory.newPreparedStatementCreator(
                listOf(
                        datasourceMetadata.name,
                        datasourceMetadata.userName,
                        datasourceMetadata.password,
                        datasourceMetadata.url,
                        datasourceMetadata.type.toString(),
                        id
                ))


        return jdbcTemplate.update(statementCreator) == 1
    }

    override fun delete(id: Long): Boolean {
        return jdbcTemplate.update("delete from ${TableName.DATASOURCES} where id = $id") == 1
    }
}
