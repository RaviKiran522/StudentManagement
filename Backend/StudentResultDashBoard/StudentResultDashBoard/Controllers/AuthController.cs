using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentResultDashBoard.Modals;

namespace StudentResultDashBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private const string ValidUsername = "admin";
        private const string ValidPassword = "password123";

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login login)
        {
            if (login.Username == ValidUsername && login.Password == ValidPassword)
            {
                return Ok(new { message = "Login successful" });
            }

            return Unauthorized(new { message = "Invalid username or password" });
        }
    }
}
