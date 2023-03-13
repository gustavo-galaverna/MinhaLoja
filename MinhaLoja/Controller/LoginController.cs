using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinhaLoja.Data;
using MinhaLoja.Models;
using MinhaLoja.Services;
using System.Threading.Tasks;

namespace MinhaLoja.Controller
{
    [ApiController]
    [Route("v1")]
    public class LoginController : ControllerBase
    {

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<dynamic>> AuthenticateAsync([FromServices] AppDbContext context, [FromBody] User model)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => model.Username.Equals(x.Username) && model.Password.Equals(x.Password));
            if (user == null)
                return NotFound(new { message = "You have entered an invalid username or password" });

            var token = TokenService.GenerateToken(user);

            user.Password = "";
            return new
            {
                user = user,
                token = token
            };
        }

    }
}
