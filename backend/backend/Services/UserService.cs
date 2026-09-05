using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repository;
        private readonly PasswordHasher<User> passwordHasher;
        public UserService(IUserRepository repository, PasswordHasher<User> passwordHasher)
        {
            this.repository = repository;
            this.passwordHasher = passwordHasher;
        }

        public async Task AddUser(User user)
        {
            user.Password = passwordHasher.HashPassword(user, user.Password);
            await repository.AddUser(user);
        }

        public Task DeleteUser(int id) => repository.DeleteUser(id);

        public Task<IEnumerable<User>> GetAll() => repository.GetAll();

        public async Task<User> GetUser(int id) => await repository.GetUser(id) ??
            throw new KeyNotFoundException("User not found");

        public async Task<User> GetUserByEmail(string email) => await repository.GetUserByEmail(email) ??
            throw new KeyNotFoundException("User not found");

        public Task UpdateUser(User user) => repository.UpdateUser(user);
    }
}
