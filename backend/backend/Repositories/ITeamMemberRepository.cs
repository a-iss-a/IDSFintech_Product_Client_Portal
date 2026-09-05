using backend.Models;

namespace backend.Repositories
{
    public interface ITeamMemberRepository
    {
        Task<IEnumerable<TeamMember>> GetAll();
        Task<TeamMember> GetTeamMember(int id);
        Task DeleteTeamMember(int id);
        Task AddTeamMember(TeamMember teamMember);
        Task UpdateTeamMember(TeamMember teamMember);
        Task<TeamMember> GetTeamMemberByDepartment(int departmentId);
    }
}
