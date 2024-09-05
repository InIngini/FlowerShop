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
    public class BouquetService : IBouquetService
    {
        private readonly Context _context; // Подставьте ваш контекст БД

        public BouquetService(Context context)
        {
            _context = context;
        }

        public IEnumerable<Bouquet> GetAllBouquets()
        {
            return _context.Bouquets.ToList();
        }

        public Bouquet GetBouquetById(int id)
        {
            return _context.Bouquets.Find(id);
        }

        public void AddBouquet(Bouquet bouquet)
        {
            _context.Bouquets.Add(bouquet);
            _context.SaveChanges();
        }

        public void UpdateBouquet(Bouquet bouquet)
        {
            _context.Bouquets.Update(bouquet);
            _context.SaveChanges();
        }

        public void DeleteBouquet(int id)
        {
            var bouquet = _context.Bouquets.Find(id);
            if (bouquet != null)
            {
                _context.Bouquets.Remove(bouquet);
                _context.SaveChanges();
            }
        }
    }
}
