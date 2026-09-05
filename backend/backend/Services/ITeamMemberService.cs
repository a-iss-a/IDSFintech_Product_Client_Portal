using backend.Models;

namespace backend.Services
{
    public interface ITeamMemberService
    {
        Task<IEnumerable<TeamMember>> GetAll();
        Task<TeamMember> GetTeamMember(int id);
        Task DeleteTeamMember(int id);
        Task AddTeamMember(TeamMember teamMember);
        Task UpdateTeamMember(TeamMember teamMember);
        Task<TeamMember> GetTeamMemberByDepartment(int departmentId);
    }
}
