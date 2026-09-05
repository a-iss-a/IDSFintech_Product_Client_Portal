using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProductResponsibilityService : IProductResponsibilityService
    {
        private readonly IProductResponsibilityRepository repository;

        public ProductResponsibilityService(IProductResponsibilityRepository repository)
        {
            this.repository = repository;
        }

        public Task AddProductResponsibility(ProductResponsibility productResponsibility) => repository.AddProductResponsibility(productResponsibility);

        public Task DeleteProductResponsibility(int id) => repository.DeleteProductResponsibility(id);

        public Task<IEnumerable<ProductResponsibility>> GetAll() => repository.GetAll();

        public async Task<ProductResponsibility> GetProductResponsibility(int id) => await repository.GetProductResponsibility(id) ??
            throw new KeyNotFoundException("Product responsibility not found");

        public async Task<ProductResponsibility> GetResponsibilityByProduct(int productId) => await repository.GetResponsibilityByProduct(productId) ??
            throw new KeyNotFoundException("Product responsibility not found");

        public async Task<ProductResponsibility> GetResponsibilityByTeamMember(int teamMemberId) => await repository.GetResponsibilityByTeamMember(teamMemberId) ??
            throw new KeyNotFoundException("Product responsibility not found");

        public Task UpdateProductResponsibility(ProductResponsibility productResponsibility) => repository.UpdateProductResponsibility(productResponsibility);
    }
}
