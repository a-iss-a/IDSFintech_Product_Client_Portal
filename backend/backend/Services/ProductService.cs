using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository repository;
        public ProductService(IProductRepository repository)
        {
            this.repository = repository;
        }

        public Task AddProduct(Product product) => repository.AddProduct(product);

        public Task DeleteProduct(int id) => repository.DeleteProduct(id);

        public Task<IEnumerable<Product>> GetAll() => repository.GetAll();
        public async Task<Product> GetProduct(int id) => await repository.GetProduct(id) ??
            throw new KeyNotFoundException("Product not found");

        public async Task<Product> GetProductByStatus(string status) => await repository.GetProductByStatus(status) ??
            throw new KeyNotFoundException("Product not found");
        public async Task<Product> GetProductByTechnology(string technology) => await repository.GetProductByTechnology(technology) ??
            throw new KeyNotFoundException("Product not found");

        public Task UpdateProduct(Product product) => repository.UpdateProduct(product);
    }
}
