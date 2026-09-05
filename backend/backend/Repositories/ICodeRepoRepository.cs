using backend.Models;

namespace backend.Repositories
{
    public interface ICodeRepoRepository
    {
        Task<IEnumerable<CodeRepo>> GetAll();
        Task<CodeRepo> GetRepository(int  id);
        Task AddRepository(CodeRepo codeRepo);
        Task DeleteRepository(int id);
        Task UpdateRepository(CodeRepo codeRepo);
        Task<CodeRepo> GetRepositoryByProduct(int  productId);
    }
}
