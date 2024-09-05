using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.DB.Entities;
using WebDevelopment.DB;

namespace WebDevelopment.BLL.Services
{
    public class FlowerService : IFlowerService
    {
        private readonly Context _context; // Подставьте ваш контекст БД

        public FlowerService(Context context)
        {
            _context = context;
        }

        public IEnumerable<Flower> GetAllFlowers()
        {
            return _context.Flowers.ToList();
        }

        public Flower GetFlowerById(int id)
        {
            return _context.Flowers.Find(id);
        }

        public void AddFlower(Flower flower)
        {
            _context.Flowers.Add(flower);
            _context.SaveChanges();
        }

        public void UpdateFlower(Flower flower)
        {
            _context.Flowers.Update(flower);
            _context.SaveChanges();
        }

        public void DeleteFlower(int id)
        {
            var flower = _context.Flowers.Find(id);
            if (flower != null)
            {
                _context.Flowers.Remove(flower);
                _context.SaveChanges();
            }
        }
    }
}
