using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository repository;

        public ClientService(IClientRepository repository)
        {
            this.repository = repository;
        }

        public Task AddClient(Client client) => repository.AddClient(client);

        public Task DeleteClient(int id) => repository.DeleteClient(id);

        public Task<IEnumerable<Client>> GetAll() => repository.GetAll();
        public async Task<Client> GetClient(int id) => await repository.GetClient(id) ??
            throw new KeyNotFoundException("Client not found");

        public async Task<Client> GetClientByCountry(string country) => await repository.GetClientByCountry(country) ??
            throw new KeyNotFoundException("Client not found");

        public Task UpdateClient(Client client) => repository.UpdateClient(client);
    }
}
