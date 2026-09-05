using backend.Data;
using backend.Models;
using Dapper;
using System.Reflection.Metadata.Ecma335;

namespace backend.Repositories
{
    public class DeploymentRepository : IDeploymentRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public DeploymentRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddDeployment(Deployment deployment)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into Deployment (ClientId,ProductId,ProductVersion,GoLiveDate,DeploymentStatus,SupportTier,ClientSpecificNotes)" +
                " values (@ClientId,@ProductId,@ProductVersion,@GoLiveDate,@DeploymentStatus,@SupportTier,@ClientSpecificNotes)",
                deployment);
        }

        public async Task DeleteDeployment(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();
            await connection.ExecuteAsync("delete from DeploymentEnvironment where DeploymentId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Deployment where Id=@Id",
                new { Id = id }, transaction);
            transaction.Commit();
        }

        public async Task<IEnumerable<Deployment>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var deployments = await connection.QueryAsync<Deployment>("select * from Deployment");
            return deployments;
        }

        public async Task<Deployment> GetDeployment(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var deployment = await connection.QueryFirstOrDefaultAsync<Deployment>("select * from Deployment where Id=@Id",
                new { Id = id });
            return deployment;
        }

        public async Task<Deployment> GetDeploymentByClient(int clientId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var deployment = await connection.QueryFirstOrDefaultAsync<Deployment>("select * from Deployment where ClientId=@ClientId",
                new { ClientId = clientId });
            return deployment;
        }

        public async Task<Deployment> GetDeploymentByProduct(int productId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var deployment = await connection.QueryFirstOrDefaultAsync<Deployment>("select * from Deployment where ProductId=@ProductId",
                new { ProductId = productId });
            return deployment;
        }

        public async Task<Deployment> GetDeploymentByStatus(string status)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var deployment = await connection.QueryFirstOrDefaultAsync<Deployment>("select * from Deployment where DeploymentStatus=@DeploymentStatus",
                new { DeploymentStatus = status });
            return deployment;
        }

        public async Task<Deployment> GetDeploymentByVersion(string version)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var deployment = await connection.QueryFirstOrDefaultAsync<Deployment>("select * from Deployment where ProductVersion=@ProductVersion",
                new { ProductVersion = version });
            return deployment;
        }

        public async Task UpdateDeployment(Deployment deployment)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update Deployment " +
                "set ClientId=@ClientId, ProductId=@ProductId, ProductVersion=@ProductVersion, GoLiveDate=@GoLiveDate, " +
                "DeploymentStatus=@DeploymentStatus, SupportTier=@SupportTier, ClientSpecificNotes=@ClientSpecificNotes where Id=@Id",
                deployment);
        }
    }
}
