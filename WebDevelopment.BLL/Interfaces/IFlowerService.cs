using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.BLL.Interfaces
{

    public interface IFlowerService
    {
        IEnumerable<Flower> GetAllFlowers();
        Flower GetFlowerById(int id);
        void AddFlower(Flower flower);
        void UpdateFlower(Flower flower);
        void DeleteFlower(int id);
    }
}
