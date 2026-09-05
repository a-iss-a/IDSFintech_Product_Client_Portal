using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public ProductRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddProduct(Product product)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into Product (Name,Description,BusinessPurpose,LifecycleStatus,CurrentVersion,SupportedMarkets,Criticality,Technologies,Notes,CreatedAt,UpdatedAt) " +
                " values (@Name,@Description,@BusinessPurpose,@LifecycleStatus,@CurrentVersion,@SupportedMarkets,@Criticality,@Technologies,@Notes,@CreatedAt,@UpdatedAt)",
                product);
        }

        public async Task DeleteProduct(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();
            await connection.ExecuteAsync("delete from DeploymentEnvironment where DeploymentId in (select Id from Deployment where ProductId=@Id)",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Deployment where ProductId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from ProductResponsibility where ProductId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from CodeRepo where ProductId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Document where ProductId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Module where ProductId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from Product where Id=@Id",
                new { Id = id }, transaction);
            transaction.Commit();
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var product = await connection.QueryAsync<Product>("select * from Product");
            return product;
        }

        public async Task<Product> GetProduct(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var product = await connection.QueryFirstOrDefaultAsync<Product>("select * from Product where Id=@Id",
                new { Id = id });
            return product;
        }

        public async Task<Product> GetProductByStatus(string status)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var product = await connection.QueryFirstOrDefaultAsync<Product>("select * from Product where LifecycleStatus=@LifecycleStatus",
                new { LifecycleStatus = status });
            return product;
        }

        public async Task<Product> GetProductByTechnology(string technology)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var product = await connection.QueryFirstOrDefaultAsync<Product>("select * from Product where Technologies=@Technologies",
                new { Technologies = technology });
            return product;
        }

        public async Task UpdateProduct(Product product)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update Product set Name=@Name, Description=@Description, BusinessPurpose=@BusinessPurpose," +
                " LifecycleStatus=@LifecycleStatus, CurrentVersion=@CurrentVersion, SupportedMarkets=@SupportedMarkets, Criticality=@Criticality, " +
                "Technologies=@Technologies, Notes=@Notes, CreatedAt=@CreatedAt, UpdatedAt=@UpdatedAt where Id=@Id", product);
        }
    }
}
