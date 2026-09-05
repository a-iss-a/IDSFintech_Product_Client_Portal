using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
       private readonly DbConnectionFactory dbConnectionFactory;

        public UserRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddUser(User user)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into [User] (Name,Email,Password,Role,isActive) values (@Name,@Email,@Password,@Role,@isActive)",
                user);
        }

        public async Task DeleteUser(int id) 
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from [User] where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<User>> GetAll()
        {
           using var connection = dbConnectionFactory.GetConnection();
            var users = await connection.QueryAsync<User>("select * from [User]");
            return users;
        }

        public async Task<User> GetUser(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var user = await connection.QueryFirstOrDefaultAsync<User>("select * from [User] where Id=@Id",
                new { Id = id });
            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var user = await connection.QueryFirstOrDefaultAsync<User>("select * from [User] where Email=@Email",
                new { Email = email });
            return user;
        }

        public async Task UpdateUser(User user)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("Update [User] set Name=@Name, Email=@Email, Password=@Password," +
                "Role=@Role, isActive=@isActive where id=@Id",
                user);
        }
    }
}
