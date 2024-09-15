using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.DB.Entities;
using WebDevelopment.DB;
using WebDevelopment.BLL.Token;
using System.Threading;
using WebDevelopment.BLL.Errors;

namespace WebDevelopment.BLL.Services
{
    public class AdminService : IAdminService
    {
        private readonly Context _context; // Подставьте ваш контекст БД
        private readonly ITokenService _tokenService;

        public AdminService(Context context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
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

        public string Login(string Login, string Password)
        {
            var user = _context.Admins.Where(u => u.Login == Login && u.Password == Password)
                                              .FirstOrDefault();

            if (user == null)
            {
                throw new UnauthorizedAccessException(TypesOfErrors.NotFoundById("Пользователь",1));
            }

            var token = _tokenService.CreateToken(user);

            return token;
        }
    }
}
