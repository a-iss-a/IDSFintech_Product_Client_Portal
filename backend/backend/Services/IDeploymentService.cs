using backend.Models;

namespace backend.Services
{
    public interface IDeploymentService
    {
        Task<IEnumerable<Deployment>> GetAll();
        Task<Deployment> GetDeployment(int id);
        Task DeleteDeployment(int id);
        Task AddDeployment(Deployment deployment);
        Task UpdateDeployment(Deployment deployment);
        Task<Deployment> GetDeploymentByProduct(int productId);
        Task<Deployment> GetDeploymentByClient(int clientId);
        Task<Deployment> GetDeploymentByStatus(string status);
        Task<Deployment> GetDeploymentByVersion(string version);
    }
}
