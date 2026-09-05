using Microsoft.Data.SqlClient;

namespace backend.Data
{
    public class DbConnectionFactory
    {
        private readonly IConfiguration configuration;

        public DbConnectionFactory(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
