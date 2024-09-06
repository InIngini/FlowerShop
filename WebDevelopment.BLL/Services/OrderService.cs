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
    public class OrderService : IOrderService
    {
        private readonly Context _context; // замените Context на ваш контекст

        public OrderService(Context context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetOrders()
        {
            return _context.Orders.ToList();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return _context.Orders.Find(id);
        }

        public async Task AddOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public async Task UpdateOrder(Order order)
        {
            _context.Orders.Update(order);
            _context.SaveChanges();
        }

        public async Task DeleteOrder(int id)
        {
            var order = _context.Orders.Find(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                _context.SaveChanges();
            }
        }
    }
}
