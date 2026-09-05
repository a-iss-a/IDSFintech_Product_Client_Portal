using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ModuleService : IModuleService
    {
        private readonly IModuleRepository repository;

        public ModuleService(IModuleRepository repository)
        {
            this.repository = repository;
        }

        public Task AddModule(Module module) => repository.AddModule(module);

        public Task DeleteModule(int id) => repository.DeleteModule(id);

        public Task<IEnumerable<Module>> GetAll() => repository.GetAll();

        public async Task<Module> GetModule(int id) => await repository.GetModule(id) ??
            throw new KeyNotFoundException("Module not found");

        public async Task<Module> GetModuleByProduct(int productId) => await repository.GetModuleByProduct(productId) ??
            throw new KeyNotFoundException("Module not found");

        public Task UpdateModule(Module module) => repository.UpdateModule(module);
    }
}
