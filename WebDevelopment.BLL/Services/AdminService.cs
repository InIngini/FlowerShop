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
    public class AdminService : IAdminService
    {
        private readonly Context _context; // Подставьте ваш контекст БД

        public AdminService(Context context)
        {
            _context = context;
        }

        public IEnumerable<Admin> GetAllAdmins()
        {
            return _context.Admins.ToList();
        }

        public Admin GetAdminById(int id)
        {
            return _context.Admins.Find(id);
        }

        public void AddAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            _context.SaveChanges();
        }

        public void UpdateAdmin(Admin admin)
        {
            _context.Admins.Update(admin);
            _context.SaveChanges();
        }

        public void DeleteAdmin(int id)
        {
            var admin = _context.Admins.Find(id);
            if (admin != null)
            {
                _context.Admins.Remove(admin);
                _context.SaveChanges();
            }
        }
    }
}
