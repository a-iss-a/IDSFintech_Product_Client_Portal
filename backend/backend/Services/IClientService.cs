using backend.Models;

namespace backend.Services
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAll();
        Task<Client> GetClient(int id);
        Task AddClient(Client client);
        Task DeleteClient(int id);
        Task UpdateClient(Client client);
        Task<Client> GetClientByCountry(string country);
    }
}
