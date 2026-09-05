using backend.Models;

namespace backend.Services
{
    public interface IDeploymentEnvironmentService
    {
        Task<IEnumerable<DeploymentEnvironment>> GetAll();
        Task<DeploymentEnvironment> GetDeploymentEnvironment(int id);
        Task AddEnvironment(DeploymentEnvironment environment);
        Task UpdateEnvironment(DeploymentEnvironment environment);
        Task DeleteEnvironment(int id);
        Task<DeploymentEnvironment> GetEnvironmentByDeployment(int deploymentId);
    }
}
