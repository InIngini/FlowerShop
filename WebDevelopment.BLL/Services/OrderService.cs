using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.DB.Entities;
using WebDevelopment.DB;
using System.Net;
using System.Net.Mail;

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

            // Отправка письма
            SendOrderEmail(order);
        }

        private void SendOrderEmail(Order order)
        {
            try
            {
                // Настройка почтового клиента
                using (var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("vorobdasha2016@gmail.com", "456*65*4*"),
                    EnableSsl = true,
                })
                {
                    // Настройка сообщения
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("vorobdasha2016@gmail.com"),
                        Subject = "Новый заказ",
                        Body = $"Детали заказа:\n" +
                               $"Имя: {order.Name}\n" +
                               $"Фамилия: {order.LastName}\n" +
                               $"Телефон: {order.PhoneNumber}\n" +
                               $"Адрес: {order.Address}\n" +
                               $"Способ оплаты: {order.PaymentType}\n" +
                               $"Текст заказа: {order.OrderText}\n" +
                               $"Цена: {order.Price}",
                        IsBodyHtml = false,
                    };

                    mailMessage.To.Add(order.Email); // Отправляем на адрес, указанный в заказе

                    // Отправка почты
                    smtpClient.Send(mailMessage);
                }
            }
            catch (Exception ex)
            {
                // Логгирование ошибки отправки почты
                Console.WriteLine("Ошибка при отправке почты: " + ex.Message);
                // Вы также можете захотеть обработать эту ошибку более подробно, например, записать в лог
            }
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
