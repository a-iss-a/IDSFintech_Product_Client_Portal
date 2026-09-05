using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public DepartmentRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddDepartment(Department department)
        {
            using var connection = dbConnectionFactory.GetConnection(); 
            await connection.ExecuteAsync("insert into Department (Name) values (@Name)",department);
        }

        public async Task DeleteDepartment(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("delete from Department where Id=@Id",
                new { Id = id });
        }

        public async Task<IEnumerable<Department>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var departments = await connection.QueryAsync<Department>("select * from Department");
            return departments;
        }

        public async Task<Department> GetDepartment(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var department = await connection.QueryFirstOrDefaultAsync<Department>("select * from Department where Id=@Id",
                new { Id = id });
            return department;
        }

        public async Task UpdateDepartment(Department department)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update Department set Name=@Name where Id=@Id", department);
        }
    }
}
