using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class CodeRepoService : ICodeRepoService
    {
        private readonly ICodeRepoRepository repository;

        public CodeRepoService(ICodeRepoRepository repository)
        {
            this.repository = repository;
        }

        public Task AddRepository(CodeRepo codeRepo) => repository.AddRepository(codeRepo);

        public Task DeleteRepository(int id) => repository.DeleteRepository(id);

        public Task<IEnumerable<CodeRepo>> GetAll() => repository.GetAll();

        public async Task<CodeRepo> GetRepository(int id) => await repository.GetRepository(id) ??
            throw new KeyNotFoundException("Repository not found");

        public async Task<CodeRepo> GetRepositoryByProduct(int productId) => await repository.GetRepositoryByProduct(productId) ??
            throw new KeyNotFoundException("Repository not found");

        public Task UpdateRepository(CodeRepo codeRepo) => repository.UpdateRepository(codeRepo);
    }
}
