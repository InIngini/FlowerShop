using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.BLL.Interfaces
{
    public interface IAdminService
    {
        IEnumerable<Admin> GetAllAdmins();
        Admin GetAdminById(int id);
        void AddAdmin(Admin admin);
        void UpdateAdmin(Admin admin);
        void DeleteAdmin(int id);
    }
}
