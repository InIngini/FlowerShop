using Microsoft.AspNetCore.Mvc;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.BLL.Services;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.Controllers
{
    public class OrderController : Controller
    {
        private readonly IBouquetService _bouquetService;
        private readonly IFlowerService _flowerService;

        public OrderController(IBouquetService bouquetService, IFlowerService flowerService)
        {
            _flowerService = flowerService;
            _bouquetService = bouquetService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("Bouquet")]
        public ActionResult<IEnumerable<Bouquet>> GetAllBouquets()
        {
            var bouquets = _bouquetService.GetAllBouquets();
            return Ok(bouquets);
        }

        [HttpGet("Flower")]
        public ActionResult<IEnumerable<Flower>> GetAllFlowers()
        {
            var flowers = _flowerService.GetAllFlowers();
            return Ok(flowers);
        }
    }
}
