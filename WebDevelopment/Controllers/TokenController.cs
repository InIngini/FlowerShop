using Microsoft.AspNetCore.Mvc;
using WebDevelopment.BLL.Interfaces;

namespace WebDevelopment.Controllers
{
    [ApiController]
    [Route("/token")]
    public class TokenController : Controller
    {
        private readonly IAdminService _adminService;
        public TokenController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpPost]
        public async Task<IActionResult> Token([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            // Проверьте логин и пароль в БД
            var token = _adminService.Login(model.Login, model.Password);

            return Ok(new { token });
        }
    }

    public class LoginModel
    {
        public string Login {  get; set; }
        public string Password { get; set; }
    }

}
