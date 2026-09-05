using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService service;

        public ProductController(IProductService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await service.GetAll();
            return Ok(new { products });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await service.GetProduct(id);
            return Ok(new { product });
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetProductByStatus(string status)
        {
            var product = await service.GetProductByStatus(status);
            return Ok(new { product });
        }

        [HttpGet("technology/{technology}")]
        public async Task<IActionResult> GetProductByTechnology(string technology)
        {
            var product = await service.GetProductByTechnology(technology);
            return Ok(new { product });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddProduct(Product product)
        {
            await service.AddProduct(product);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await service.DeleteProduct(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            product.Id = id;
            await service.UpdateProduct(product);
            return Ok();
        }
    }
}
