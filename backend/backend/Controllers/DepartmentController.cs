using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService service;

        public DepartmentController(IDepartmentService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await service.GetAll();
            return Ok(new { departments });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(int id) 
        {
            var department = await service.GetDepartment(id);
            return Ok(new { department });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddDepartment(Department department)
        {
            await service.AddDepartment(department);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            await service.DeleteDepartment(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id,  Department department)
        {
            department.Id = id;
            await service.UpdateDepartment(department);
            return Ok();
        }
    }
}
