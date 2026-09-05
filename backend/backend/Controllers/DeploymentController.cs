using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeploymentController : ControllerBase
    {
        private readonly IDeploymentService service;

        public DeploymentController(IDeploymentService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var deployments = await service.GetAll();
            return Ok(new { deployments });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeployment(int id)
        {
            var deployment = await service.GetDeployment(id);
            return Ok(new { deployment });
        }

        [HttpGet("Client/{clientId}")]
        public async Task<IActionResult> GetDeploymentByClient(int clientId)
        {
            var deployment = await service.GetDeploymentByClient(clientId);
            return Ok(new { deployment });
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetDeploymentByProduct(int productId)
        {
            var deployment = await service.GetDeploymentByProduct(productId);
            return Ok(new { deployment });
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetDeploymentByStatus(string status)
        {
            var deployment = await service.GetDeploymentByStatus(status);
            return Ok(new { deployment });
        }

        [HttpGet("version/{version}")]
        public async Task<IActionResult> GetDeploymentByVersion(string version)
        {
            var deployment = await service.GetDeploymentByVersion(version);
            return Ok(new { deployment });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddDeployment(Deployment deployment)
        {
            await service.AddDeployment(deployment);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeployment(int id)
        {
            await service.DeleteDeployment(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeployment(int id, Deployment deployment)
        {
            deployment.Id = id;
            await service.UpdateDeployment(deployment);
            return Ok();
        }
    }
}
