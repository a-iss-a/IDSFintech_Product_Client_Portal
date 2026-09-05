using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeploymentEnvironmentController : ControllerBase
    {
        private readonly IDeploymentEnvironmentService service;

        public DeploymentEnvironmentController(IDeploymentEnvironmentService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var environment = await service.GetAll();
            return Ok(new { environment });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEnvironment(int id)
        {
            var environment = await service.GetDeploymentEnvironment(id);
            return Ok(new { environment });
        }

        [HttpGet("deployment/{deploymentId}")]
        public async Task<IActionResult> GetEnvironmentByDeployment(int deploymentId)
        {
            var environment = await service.GetEnvironmentByDeployment(deploymentId);
            return Ok(new { environment });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddEnvironment(DeploymentEnvironment environment)
        {
            await service.AddEnvironment(environment);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnvironment(int id)
        {
            await service.DeleteEnvironment(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnvironment(int id, DeploymentEnvironment environment)
        {
            environment.Id = id;
            await service.UpdateEnvironment(environment);
            return Ok();
        }
    }
}
