using backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IUserService userService;
        private readonly PasswordHasher<User> passwordHasher;
        private readonly IConfiguration configuration;

        public AuthService(IUserService userService, PasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            this.userService = userService;
            this.passwordHasher = passwordHasher;
            this.configuration = configuration;
        }

        public async Task<string> Login(LoginRequest loginRequest)
        {
            var user = await userService.GetUserByEmail(loginRequest.Email);

            var result = passwordHasher.VerifyHashedPassword(
                user,
                user.Password,
                loginRequest.Password
                );

            if(result == PasswordVerificationResult.Failed)
                throw new UnauthorizedAccessException("Invalid email or password");
            

            if (!user.IsActive)
                throw new UnauthorizedAccessException("User account is inactive");

            var claims = new[]
            {

                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                double.Parse(configuration["Jwt:DurationInMinutes"]!)),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
