using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class DeploymentService : IDeploymentService
    {
        private readonly IDeploymentRepository repository;

        public DeploymentService(IDeploymentRepository repository)
        {
            this.repository = repository;
        }

        public Task AddDeployment(Deployment deployment) => repository.AddDeployment(deployment);

        public Task DeleteDeployment(int id) => repository.DeleteDeployment(id);

        public Task<IEnumerable<Deployment>> GetAll() => repository.GetAll();

        public async Task<Deployment> GetDeployment(int id) => await repository.GetDeployment(id) ??
            throw new KeyNotFoundException("Deployment not found");

        public async Task<Deployment> GetDeploymentByClient(int clientId) => await repository.GetDeploymentByClient(clientId) ??
            throw new KeyNotFoundException("Deployment not found");
        public async Task<Deployment> GetDeploymentByProduct(int productId) => await repository.GetDeploymentByProduct(productId) ??
            throw new KeyNotFoundException("Deployment not found");

        public async Task<Deployment> GetDeploymentByStatus(string status) => await repository.GetDeploymentByStatus(status) ??
            throw new KeyNotFoundException("Deployment not found");

        public async Task<Deployment> GetDeploymentByVersion(string version) => await repository.GetDeploymentByVersion(version) ??
            throw new KeyNotFoundException("Deployment not found");

        public Task UpdateDeployment(Deployment deployment) => repository.UpdateDeployment(deployment);
    }
}
