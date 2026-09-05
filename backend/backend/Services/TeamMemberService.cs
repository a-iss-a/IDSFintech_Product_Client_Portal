using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class TeamMemberService : ITeamMemberService
    {
        private readonly ITeamMemberRepository repository;

        public TeamMemberService(ITeamMemberRepository repository)
        {
            this.repository = repository;
        }

        public Task AddTeamMember(TeamMember teamMember) => repository.AddTeamMember(teamMember);

        public Task DeleteTeamMember(int id) => repository.DeleteTeamMember(id);

        public Task<IEnumerable<TeamMember>> GetAll() => repository.GetAll();

        public async Task<TeamMember> GetTeamMember(int id) => await repository.GetTeamMember(id) ??
            throw new KeyNotFoundException("Team member not found");

        public async Task<TeamMember> GetTeamMemberByDepartment(int departmentId) => await repository.GetTeamMemberByDepartment(departmentId) ??
            throw new KeyNotFoundException("Team member not found");

        public Task UpdateTeamMember(TeamMember teamMember) => repository.UpdateTeamMember(teamMember);
    }
}
