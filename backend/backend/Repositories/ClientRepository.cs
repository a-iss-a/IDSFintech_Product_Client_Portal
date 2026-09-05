using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public ClientRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddClient(Client client)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into Client (CompanyName,Country,Email,PhoneNumber,Status,Notes)" +
                " values (@CompanyName,@Country,@Email,@PhoneNumber,@Status,@Notes)", client);
        }

        public async Task DeleteClient(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();
            await connection.ExecuteAsync("delete from DeploymentEnvironment where DeploymentId in (select Id from Deployment where ClientId=@Id)",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Deployment where ClientId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Client where Id=@Id",
                new { Id = id }, transaction);
            transaction.Commit();
        }

        public async Task<IEnumerable<Client>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var clients =  await connection.QueryAsync<Client>("select * from Client");
            return clients;
        }

        public async Task<Client> GetClient(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var client = await connection.QueryFirstOrDefaultAsync<Client>("select * from Client where Id=@Id",
                new { Id = id });
            return client;
        }

        public async Task<Client> GetClientByCountry(string country)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var client = await connection.QueryFirstOrDefaultAsync<Client>("select * from Client where Country=@Country",
                new { Country = country });
            return client;
        }

        public async Task UpdateClient(Client client)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update Client set CompanyName=@CompanyName, Country=@Country, Email=@Email, PhoneNumber=@PhoneNumber,Status=@Status," +
                "Notes=@Notes where Id=@Id", 
                client);
        }
    }
}
