using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.BLL.DTO;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.BLL.Interfaces
{
    public interface INewService
    {
        IEnumerable<New> GetAllNews();
        New GetNewById(int id);
        void AddNew(New news);
        void UpdateNew(New news);
        void DeleteNew(int id);
    }
}
