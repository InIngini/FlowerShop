using Microsoft.AspNetCore.Mvc;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.BLL.Services;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.Controllers
{
    [ApiController]
    [Route("/order")]
    public class OrderController : Controller
    {
        private readonly IBouquetService _bouquetService;
        private readonly IFlowerService _flowerService;
        private readonly IOrderService _orderService;

        public OrderController(IBouquetService bouquetService, IFlowerService flowerService, IOrderService orderService)
        {
            _flowerService = flowerService;
            _bouquetService = bouquetService;
            _orderService = orderService;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("bouquets")]
        public ActionResult<IEnumerable<Bouquet>> GetAllBouquets()
        {
            var bouquets = _bouquetService.GetAllBouquets();
            return Ok(bouquets);
        }

        [HttpGet("flowers")]
        public ActionResult<IEnumerable<Flower>> GetAllFlowers()
        {
            var flowers = _flowerService.GetAllFlowers();
            return Ok(flowers);
        }
        // Добавление заказа
        [HttpPost("orders")]
        public async Task<IActionResult> AddOrder([FromBody] Order order)
        {
            await _orderService.AddOrder(order);
            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }
        [HttpGet("Order/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
    }
}
