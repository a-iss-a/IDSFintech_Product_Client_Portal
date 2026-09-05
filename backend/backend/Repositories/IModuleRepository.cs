using backend.Models;

namespace backend.Repositories
{
    public interface IModuleRepository
    {
        Task<IEnumerable<Module>> GetAll();
        Task<Module> GetModule(int id);
        Task AddModule(Module module);
        Task DeleteModule(int id);
        Task UpdateModule(Module module);
        Task<Module> GetModuleByProduct(int productId);
    }
}
