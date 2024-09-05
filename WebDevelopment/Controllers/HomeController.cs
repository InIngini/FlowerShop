using Microsoft.AspNetCore.Mvc;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.Controllers
{
    public class HomeController : Controller
    {
        private readonly INewService _newService;
        public HomeController(INewService newService)
        {
            _newService = newService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("New")]
        public ActionResult<IEnumerable<New>> GetAllNews()
        {
            var news = _newService.GetAllNews();
            return Ok(news);
        }
    }
}
