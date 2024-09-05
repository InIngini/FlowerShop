using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.BLL.Interfaces
{
    public interface IBouquetService
    {
        IEnumerable<Bouquet> GetAllBouquets();
        Bouquet GetBouquetById(int id);
        void AddBouquet(Bouquet bouquet);
        void UpdateBouquet(Bouquet bouquet);
        void DeleteBouquet(int id);
    }
}
