
using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAll();
        Task<User> GetUser(int id);
        Task<User> GetUserByEmail(string email);
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int id);
    }
}
