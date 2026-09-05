using backend.Models;

namespace backend.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
        Task<Product> GetProduct(int id);
        Task AddProduct(Product product);
        Task DeleteProduct(int id);
        Task UpdateProduct(Product product);
        Task<Product> GetProductByStatus(string status);
        Task<Product> GetProductByTechnology(string technology);
    }
}
