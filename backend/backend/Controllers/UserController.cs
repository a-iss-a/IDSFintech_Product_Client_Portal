using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await userService.GetAll();
            return Ok(new { users });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await userService.GetUser(id);
            return Ok(new { user });
        }

        [HttpGet("email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await userService.GetUserByEmail(email);
            return Ok(new { user });
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddUser(User user)
        {
            await userService.AddUser(user);
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        { 
            await userService.DeleteUser(id); 
            return Ok(); 
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            user.Id = id;
            await userService.UpdateUser(user);
            return Ok();
        }


    }
}


