using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CodeRepoController : ControllerBase
    {
        private readonly ICodeRepoService service;

        public CodeRepoController(ICodeRepoService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var repositories = await service.GetAll();
            return Ok(new { repositories });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRepository(int id)
        {
            var repository = await service.GetRepository(id);
            return Ok(new { repository });
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetRepositoryByProduct(int productId)
        {
            var repositories = await service.GetRepositoryByProduct(productId);
            return Ok(new { repositories });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddRepository(CodeRepo repository)
        {
            await service.AddRepository(repository);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepository(int id)
        {
            await service.DeleteRepository(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRepository(int id, CodeRepo repository)
        {
            repository.Id = id;
            await service.UpdateRepository(repository);
            return Ok();
        }
    }
}
