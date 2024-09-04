using Microsoft.AspNetCore.Mvc;

namespace WebDevelopment.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
