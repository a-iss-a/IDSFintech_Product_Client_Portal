using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public ModuleRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddModule(Module module)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into Module (ProductId,Name,Description,Status) " +
                "values (@ProductId,@Name,@Description,@Status)", module);
        }

        public async Task DeleteModule(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from Module where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<Module>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var modules = await connection.QueryAsync<Module>("select * from Module");
            return modules;
        }

        public async Task<Module> GetModule(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var module = await connection.QueryFirstOrDefaultAsync<Module>("select * from Module where Id=@Id",
                new { Id = id });
            return module;
        }

        public async Task<Module> GetModuleByProduct(int productId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var modules = await connection.QueryFirstOrDefaultAsync<Module>("select * from Module where ProductId=@ProductId",
                new { ProductId = productId });
            return modules;
        }

        public async Task UpdateModule(Module module)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update Module set ProductId=@ProductId, Name=@Name,Description=@Description,Status=@Status " +
                "where Id=@Id", module);
        }
    }
}
