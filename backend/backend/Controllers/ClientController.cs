using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService service;

        public ClientController(IClientService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var clients = await service.GetAll();
            return Ok(new { clients });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await service.GetClient(id);
            return Ok(new { client });
        }

        [HttpGet("country/{country}")]
        public async Task<IActionResult> GetClientByCountry(string country)
        {
            var client = await service.GetClientByCountry(country);
            return Ok(new { client });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddClient(Client client)
        {
            await service.AddClient(client);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            await service.DeleteClient(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, Client client)
        {
            client.Id = id;
            await service.UpdateClient(client);
            return Ok();
        }
    }
}
