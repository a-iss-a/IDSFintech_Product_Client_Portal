using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class DeploymentEnvironmentService : IDeploymentEnvironmentService
    {
        private readonly IDeploymentEnvironmentRepository repository;

        public DeploymentEnvironmentService(IDeploymentEnvironmentRepository repository)
        {
            this.repository = repository;
        }

        public Task AddEnvironment(DeploymentEnvironment environment) => repository.AddEnvironment(environment);

        public Task DeleteEnvironment(int id) => repository.DeleteEnvironment(id);

        public Task<IEnumerable<DeploymentEnvironment>> GetAll() => repository.GetAll();

        public async Task<DeploymentEnvironment> GetDeploymentEnvironment(int id) => await repository.GetDeploymentEnvironment(id) ??
            throw new KeyNotFoundException("Environment not found");

        public async Task<DeploymentEnvironment> GetEnvironmentByDeployment(int deploymentId) => await repository.GetEnvironmentByDeployment(deploymentId) ??
            throw new KeyNotFoundException("Environment not found");

        public Task UpdateEnvironment(DeploymentEnvironment environment) => repository.UpdateEnvironment(environment);
    }
}
