using Microsoft.AspNetCore.Mvc;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.DB.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebDevelopment.Controllers
{
    [ApiController]
    [Route("/admin")]
    public class AdminController : Controller
    {
        private readonly IFlowerService _flowerService;
        private readonly IBouquetService _bouquetService;
        private readonly INewService _newService;

        public AdminController(IFlowerService flowerService, IBouquetService bouquetService, INewService newService)
        {
            _flowerService = flowerService;
            _bouquetService = bouquetService;
            _newService = newService;
        }

        // Метод для отображения административной страницы
        [HttpGet]  // Убедитесь, что этот маршрут правильный
        public IActionResult Index()
        {
            return View();
        }

        // CRUD для цветов
        [HttpPost("flowers")]
        public async Task<ActionResult> AddFlower([FromBody] Flower flower)
        {
            _flowerService.AddFlower(flower);
            return CreatedAtAction(nameof(GetFlowerById), new { id = flower.Id }, flower);
        }

        public ActionResult<Flower> GetFlowerById(int id)
        {
            var flower = _flowerService.GetFlowerById(id);
            if (flower == null)
            {
                return NotFound();
            }
            return Ok(flower);
        }

        [HttpGet("flowers")]
        public ActionResult<IEnumerable<Flower>> GetAllFlowers()
        {
            return Ok(_flowerService.GetAllFlowers());
        }

        [HttpPut("flowers/{id}")]
        public ActionResult UpdateFlower(int id, [FromBody] Flower flower)
        {
            if (id != flower.Id) return BadRequest();
            _flowerService.UpdateFlower(flower);
            return NoContent();
        }

        [HttpDelete("flowers/{id}")]
        public ActionResult DeleteFlower(int id)
        {
            _flowerService.DeleteFlower(id);
            return NoContent();
        }

        // CRUD для букетов
        [HttpPost("bouquets")]
        public async Task<ActionResult> AddBouquet([FromBody] Bouquet bouquet)
        {
            _bouquetService.AddBouquet(bouquet);
            return CreatedAtAction(nameof(GetBouquetById), new { id = bouquet.Id }, bouquet);
        }
        public ActionResult<Bouquet> GetBouquetById(int id)
        {
            var bouquet = _bouquetService.GetBouquetById(id);
            if (bouquet == null)
            {
                return NotFound();
            }
            return Ok(bouquet);
        }

        [HttpGet("bouquets")]
        public ActionResult<IEnumerable<Bouquet>> GetAllBouquets()
        {
            return Ok(_bouquetService.GetAllBouquets());
        }

        [HttpPut("bouquets/{id}")]
        public ActionResult UpdateBouquet(int id, [FromBody] Bouquet bouquet)
        {
            if (id != bouquet.Id) return BadRequest();
            _bouquetService.UpdateBouquet(bouquet);
            return NoContent();
        }

        [HttpDelete("bouquets/{id}")]
        public ActionResult DeleteBouquet(int id)
        {
            _bouquetService.DeleteBouquet(id);
            return NoContent();
        }

        // CRUD для новостей
        [HttpPost("news")]
        public async Task<ActionResult> AddNew([FromBody] New news)
        {
            _newService.AddNew(news);
            return CreatedAtAction(nameof(GetNewById), new { id = news.Id }, news);
        }

        public ActionResult<New> GetNewById(int id)
        {
            var news = _newService.GetNewById(id);
            if (news == null)
            {
                return NotFound();
            }
            return Ok(news);
        }

        [HttpGet("news")]
        public ActionResult<IEnumerable<New>> GetAllNews()
        {
            return Ok(_newService.GetAllNews());
        }

        [HttpPut("news/{id}")]
        public ActionResult UpdateNew(int id, [FromBody] New news)
        {
            if (id != news.Id) return BadRequest();
            _newService.UpdateNew(news);
            return NoContent();
        }

        [HttpDelete("news/{id}")]
        public ActionResult DeleteNew(int id)
        {
            _newService.DeleteNew(id);
            return NoContent();
        }
    }
}
