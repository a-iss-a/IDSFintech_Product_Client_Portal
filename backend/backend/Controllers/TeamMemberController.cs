using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamMemberController : ControllerBase
    {
        private readonly ITeamMemberService service;

        public TeamMemberController(ITeamMemberService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var teamMembers = await service.GetAll();
            return Ok(new { teamMembers });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamMember(int id)
        {
            var teamMember = await service.GetTeamMember(id);
            return Ok(new { teamMember });
            
        }

        [HttpGet("department/{departmentId}")]
        public async Task<IActionResult> GetTeamMemberByDepartment(int departmentId)
        {
            var teamMember = await service.GetTeamMemberByDepartment(departmentId);
            return Ok(new { teamMember });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddTeamMember(TeamMember teamMember)
        {
            await service.AddTeamMember(teamMember);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeamMember(int id)
        {
            await service.DeleteTeamMember(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeamMember(int id, TeamMember teamMember)
        {
            teamMember.Id = id;
            await service.UpdateTeamMember(teamMember);
            return Ok();
        }
    }

}
