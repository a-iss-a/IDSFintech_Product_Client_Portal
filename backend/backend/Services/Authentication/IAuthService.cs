using backend.Models;

namespace backend.Services.Authentication
{
    public interface IAuthService
    {
        Task<string> Login(LoginRequest loginRequest);
    }
}
