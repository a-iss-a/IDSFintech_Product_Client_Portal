using backend.Models;

namespace backend.Repositories
{
    public interface IDeploymentEnvironmentRepository
    {
        Task<IEnumerable<DeploymentEnvironment>> GetAll();
        Task<DeploymentEnvironment> GetDeploymentEnvironment(int id);
        Task AddEnvironment(DeploymentEnvironment environment);
        Task UpdateEnvironment(DeploymentEnvironment environment);
        Task DeleteEnvironment(int id);
        Task<DeploymentEnvironment> GetEnvironmentByDeployment(int deploymentId);
    }
}
