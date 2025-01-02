package configuration

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.conf.MappedSchema
import org.jooq.conf.RenderMapping
import org.jooq.conf.Settings
import org.jooq.impl.DSL


//1. We define new class with few methods which solve database connection and create DSLContext for database manipulation and access
data class DatasourceConfiguration(
    val jdbcUrl: String,
    val username: String,
    val password: String,
    val schema: String
) {
    companion object {

        //2. for beginning we create this helper method to create our Datasource configuration based on hardcoded values, we will modify this by HOCON implementation later
        private fun createDataSourceConfig(): DatasourceConfiguration {
            return DatasourceConfiguration(
                "jdbc:postgresql://localhost:5432/postgres",
                "admin",
                "admin_password",
                "dictionary"
            )
        }

        //3. this helper method will create Hikari Configuration which is used for HikariDatasourceCreation which is in final returned from method
        private fun createDataSource(dataSourceConfig: DatasourceConfiguration): HikariDataSource {
            val hikariConfig = HikariConfig()
            hikariConfig.username = dataSourceConfig.username
            hikariConfig.password = dataSourceConfig.password
            hikariConfig.jdbcUrl = dataSourceConfig.jdbcUrl
            hikariConfig.schema = dataSourceConfig.schema
            hikariConfig.maximumPoolSize = 10

            return HikariDataSource(hikariConfig)
        }

        //4 .this method will create DSL context for us, we are able to access database tables and manipulate with data in it
        fun createDSLContext(): DSLContext {
            val dataSourceConfig = createDataSourceConfig()
            val dataSource = createDataSource(dataSourceConfig)

            val settings = Settings()
                .withRenderMapping(
                    RenderMapping()
                        .withSchemata(
                            MappedSchema().withInput(dataSourceConfig.schema)
                                .withOutput(dataSourceConfig.schema)
                        )
                )

            return DSL.using(dataSource, SQLDialect.POSTGRES, settings)
        }
    }
}