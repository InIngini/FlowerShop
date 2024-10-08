﻿using Microsoft.AspNetCore.Mvc;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : Controller
    {
        private readonly INewService _newService;
        public HomeController(INewService newService)
        {
            _newService = newService;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("news")]
        public ActionResult<IEnumerable<New>> GetAllNews()
        {
            var news = _newService.GetAllNews();
            return Ok(news);
        }
    }
}
