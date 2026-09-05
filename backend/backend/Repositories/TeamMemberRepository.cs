using backend.Data;
using backend.Models;
using Dapper;

namespace backend.Repositories
{
    public class TeamMemberRepository : ITeamMemberRepository
    {
        private readonly DbConnectionFactory dbConnectionFactory;

        public TeamMemberRepository(DbConnectionFactory dbConnectionFactory)
        {
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task AddTeamMember(TeamMember teamMember)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("insert into TeamMember (DepartmentId,Name,JobTitle,Email,Status) " +
                "values (@DepartmentId,@Name,@JobTitle,@Email,@Status)",
                teamMember);
        }

        public async Task DeleteTeamMember(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();
            await connection.ExecuteAsync("delete from ProductResponsibility where TeamMemberId=@Id",
                new { Id = id }, transaction);
            await connection.ExecuteAsync("delete from TeamMember where Id=@Id",
                new { Id = id }, transaction);
            transaction.Commit();
        }

        public async Task<IEnumerable<TeamMember>> GetAll()
        {
            using var connection = dbConnectionFactory.GetConnection();
            var teamMembers = await connection.QueryAsync<TeamMember>("select * from TeamMember");
            return teamMembers;
        }

        public async Task<TeamMember> GetTeamMember(int id)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var teamMember = await connection.QueryFirstOrDefaultAsync<TeamMember>("select * from TeamMember where Id=@Id",
                new { Id = id });
            return teamMember;
        }

        public async Task<TeamMember> GetTeamMemberByDepartment(int departmentId)
        {
            using var connection = dbConnectionFactory.GetConnection();
            var teamMember = await connection.QueryFirstOrDefaultAsync<TeamMember>("select * from TeamMember where DepartmentId=@DepartmentId",
                new { DepartmentId = departmentId });
            return teamMember;
        }

        public async Task UpdateTeamMember(TeamMember teamMember)
        {
            using var connection = dbConnectionFactory.GetConnection();
            await connection.ExecuteAsync("update TeamMember set DepartmentId=@DepartmentId,Name=@Name" +
                  ",JobTitle=@JobTitle,Email=@Email,Status=@Status where Id=@Id",
                  teamMember);
        }
    }
}
