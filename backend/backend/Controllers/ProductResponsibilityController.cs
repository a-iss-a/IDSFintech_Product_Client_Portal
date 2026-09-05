using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductResponsibilityController : ControllerBase
    {
        private readonly IProductResponsibilityService service;

        public ProductResponsibilityController(IProductResponsibilityService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var responsibilities = await service.GetAll();
            return Ok(new { responsibilities });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductResponsibility(int id)
        {
            var responsibility = await service.GetProductResponsibility(id);
            return Ok(new{ responsibility });
        }

        [HttpGet("teamMember/{teamMemberId}")]
        public async Task<IActionResult> GetResponsibilityByTeamMember(int teamMemberId)
        {
            var responsibility = await service.GetResponsibilityByTeamMember(teamMemberId);
            return Ok(new{ responsibility });
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetResponsibilityByProduct(int productId)
        {
            var responsibility = await service.GetResponsibilityByProduct(productId);
            return Ok(new{ responsibility});
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddProductResponsibility(ProductResponsibility responsibility)
        {
            await service.AddProductResponsibility(responsibility);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductResponsibility(int id)
        {
            await service.DeleteProductResponsibility(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductResponsibility(int id, ProductResponsibility responsibility)
        {
            responsibility.Id = id;
            await service.UpdateProductResponsibility(responsibility);
            return Ok();
        }
    }
}
