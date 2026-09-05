using backend.Data;
using backend.Models;
using Dapper;
using System.Net.NetworkInformation;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace backend.Repositories
{
    public class CodeRepoRepository : ICodeRepoRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public CodeRepoRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddRepository(CodeRepo codeRepo)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into CodeRepo (ProductId,Name,GitHubURL,MainBranch,Description)" +
                " values (@ProductId,@Name,@GitHubURL,@MainBranch,@Description)", codeRepo);
        }

        public async Task DeleteRepository(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from CodeRepo where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<CodeRepo>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var repositories = await connection.QueryAsync<CodeRepo>("select * from CodeRepo");
            return repositories;
        }

        public async Task<CodeRepo> GetRepository(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var repository = await connection.QueryFirstOrDefaultAsync<CodeRepo>("select * from CodeRepo where Id=@Id",
                new { Id = id });
            return repository;
        }

        public async Task<CodeRepo> GetRepositoryByProduct(int productId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var repository = await connection.QueryFirstOrDefaultAsync<CodeRepo>("select * from CodeRepo where productId=@productId",
                new { ProductId = productId });
            return repository;
        }

        public async Task UpdateRepository(CodeRepo codeRepo)
        {
            using var connection = dbConnectionFactory.GetConnection();

            await connection.ExecuteAsync(
                "update CodeRepo " +
                "set ProductId=@ProductId, Name=@Name, GitHubURL=@GitHubURL, MainBranch=@MainBranch, Description=@Description " +
                "where Id=@Id",
                codeRepo);
        }
    }
}
