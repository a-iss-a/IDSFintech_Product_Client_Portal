using backend.Models;

namespace backend.Repositories
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetAll();
        Task<Client> GetClient(int id);
        Task AddClient(Client client);
        Task DeleteClient(int id);
        Task UpdateClient(Client client);
        Task<Client> GetClientByCountry(string country);
    }
}
