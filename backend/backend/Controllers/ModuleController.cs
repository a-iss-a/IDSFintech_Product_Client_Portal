using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModuleController : ControllerBase
    {
        private readonly IModuleService service;
        public ModuleController(IModuleService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var modules = await service.GetAll();
            return Ok(new { modules });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModule(int id)
        {
            var module = await service.GetModule(id);
            return Ok(new { module });
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetModuleByProduct(int productId)
        {
            var modules = await service.GetModuleByProduct(productId);
            return Ok(new { modules });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddModule(Module module)
        {
            await service.AddModule(module);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(int id)
        {
            await service.DeleteModule(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModule(int id,  Module module)
        {
            module.Id = id;
            await service.UpdateModule(module);
            return Ok();
        }
    }
}
