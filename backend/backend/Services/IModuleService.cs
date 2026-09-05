using backend.Models;

namespace backend.Services
{
    public interface IModuleService
    {
        Task<IEnumerable<Module>> GetAll();
        Task<Module> GetModule(int id);
        Task AddModule(Module module);
        Task DeleteModule(int id);
        Task UpdateModule(Module module);
        Task<Module> GetModuleByProduct(int productId);
    }
}
