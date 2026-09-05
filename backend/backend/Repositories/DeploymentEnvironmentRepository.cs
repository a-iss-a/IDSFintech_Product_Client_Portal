using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class DeploymentEnvironmentRepository : IDeploymentEnvironmentRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public DeploymentEnvironmentRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddEnvironment(DeploymentEnvironment environment)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into DeploymentEnvironment (DeploymentId, Name, Type, Purpose, ServerName, OperatingSystem, ApplicationUrl, DatabaseInformation, MonitoringLink, AccessInstructions, Notes) " +
           "values (@DeploymentId, @Name, @Type, @Purpose, @ServerName, @OperatingSystem, @ApplicationUrl, @DatabaseInformation, @MonitoringLink, @AccessInstructions, @Notes)",
           environment);
        }

        public async Task DeleteEnvironment(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from DeploymentEnvironment where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<DeploymentEnvironment>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var environments = await connection.QueryAsync<DeploymentEnvironment>("select * from DeploymentEnvironment");
            return environments;
        }

        public async Task<DeploymentEnvironment> GetDeploymentEnvironment(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var environment = await connection.QueryFirstOrDefaultAsync<DeploymentEnvironment>("select * from DeploymentEnvironment where Id=@Id",
                new { Id = id });
            return environment;
        }

        public async Task<DeploymentEnvironment> GetEnvironmentByDeployment(int deploymentId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var environment = await connection.QueryFirstOrDefaultAsync<DeploymentEnvironment>("select * from DeploymentEnvironment where DeploymentId=@DeploymentId",
                new { DeploymentId = deploymentId });
            return environment;
        }

        public async Task UpdateEnvironment(DeploymentEnvironment environment)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update DeploymentEnvironment set DeploymentId=@DeploymentId, Name=@Name, Type=@Type, Purpose=@Purpose, ServerName=@ServerName, " +
            "OperatingSystem=@OperatingSystem, ApplicationUrl=@ApplicationUrl, DatabaseInformation=@DatabaseInformation, MonitoringLink=@MonitoringLink, " +
            "AccessInstructions=@AccessInstructions, Notes=@Notes where Id=@Id",
            environment);
        }
    }
}
