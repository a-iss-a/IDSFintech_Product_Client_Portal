using backend.Data;
using backend.Models;
using Dapper;
using System.Reflection.Metadata.Ecma335;

namespace backend.Repositories
{
    public class ProductResponsibilityRepository : IProductResponsibilityRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public ProductResponsibilityRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddProductResponsibility(ProductResponsibility productResponsibility)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into ProductResponsibility (ProductId, TeamMemberId, Responsibility, Description) " +
            "values (@ProductId, @TeamMemberId, @Responsibility, @Description)", productResponsibility);
        }

        public async Task DeleteProductResponsibility(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from ProductResponsibility where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<ProductResponsibility>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var productResponsibilities = await connection.QueryAsync<ProductResponsibility>("select * from ProductResponsibility");
            return productResponsibilities;
        }

        public async Task<ProductResponsibility> GetProductResponsibility(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var productResponsibility = await connection.QueryFirstOrDefaultAsync<ProductResponsibility>("select * from ProductResponsibility where Id=@Id",
                new { Id = id });
            return productResponsibility;
        }

        public async Task<ProductResponsibility> GetResponsibilityByProduct(int productId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var productResponsibility = await connection.QueryFirstOrDefaultAsync<ProductResponsibility>("select * from ProductResponsibility where ProductId=@ProductId",
                new { ProductId = productId });
            return productResponsibility;
        }

        public async Task<ProductResponsibility> GetResponsibilityByTeamMember(int teamMemberId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var productResponsibility = await connection.QueryFirstOrDefaultAsync<ProductResponsibility>("select * from ProductResponsibility where TeamMemberId=@TeamMemberId",
                new { TeamMemberId = teamMemberId });
            return productResponsibility;
        }

        public async Task UpdateProductResponsibility(ProductResponsibility productResponsibility)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update ProductResponsibility set ProductId=@ProductId, TeamMemberId=@TeamMemberId, Responsibility=@Responsibility, Description=@Description " +
            "where Id=@Id",
            productResponsibility);
        }
    }
}
