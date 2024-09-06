using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.DB.Entities;

namespace WebDevelopment.BLL.Interfaces
{
    public interface IOrderService
    {
        Task<List<Order>> GetOrders();
        Task<Order> GetOrderById(int id);
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder(int id);
    }
}
