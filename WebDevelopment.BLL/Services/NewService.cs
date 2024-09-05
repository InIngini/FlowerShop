using WebDevelopment.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.DB;
using WebDevelopment.DB.Entities;
using WebDevelopment.BLL.DTO;

namespace WebDevelopment.BLL.Services
{
    public class NewService : INewService
    {
        private readonly Context _context; // Подставьте ваш контекст БД

        public NewService(Context context)
        {
            _context = context;
        }

        public IEnumerable<New> GetAllNews()
        {
            return _context.News.ToList();
        }

        public New GetNewById(int id)
        {
            return _context.News.Find(id);
        }

        public void AddNew(New news)
        {
            _context.News.Add(news);
            _context.SaveChanges();
        }

        public void UpdateNew(New news)
        {
            _context.News.Update(news);
            _context.SaveChanges();
        }

        public void DeleteNew(int id)
        {
            var news = _context.News.Find(id);
            if (news != null)
            {
                _context.News.Remove(news);
                _context.SaveChanges();
            }
        }
    }
}
