using backend.Models;

namespace backend.Services
{
    public interface IProductResponsibilityService
    {
        Task<IEnumerable<ProductResponsibility>> GetAll();
        Task<ProductResponsibility> GetProductResponsibility(int id);
        Task AddProductResponsibility(ProductResponsibility productResponsibility);
        Task DeleteProductResponsibility(int id);
        Task UpdateProductResponsibility(ProductResponsibility productResponsibility);
        Task<ProductResponsibility> GetResponsibilityByProduct(int productId);
        Task<ProductResponsibility> GetResponsibilityByTeamMember(int teamMemberId);
    }
}
