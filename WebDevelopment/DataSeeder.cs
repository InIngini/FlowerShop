using WebDevelopment.DB.Entities;
using WebDevelopment.DB;

namespace WebDevelopment
{
    public static class DataSeeder
    {
        public static void Seed(Context context)
        {
            // Убедимся, что база данных создана
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Добавим администраторов
            if (!context.Admins.Any())
            {
                context.Admins.AddRange(new List<Admin>
                {
                    new Admin { Login = "admin1", Password = "password1" }
                });
            }

            // Добавляем цветы
            if (!context.Flowers.Any())
            {
                context.Flowers.AddRange(new List<Flower>
                {
                    new Flower { Name = "Роза", Price = 150 },
                    new Flower { Name = "Тюльпан", Price = 100 },
                    new Flower { Name = "Лилия", Price = 200 },
                    new Flower { Name = "Гипсофилы", Price = 100 },
                    new Flower { Name = "Пионы", Price = 400 },
                    new Flower { Name = "Хризантемы", Price = 200 },

                });
            }

            // Добавляем букеты
            if (!context.Bouquets.Any())
            {
                context.Bouquets.AddRange(new List<Bouquet>
                {
                    new Bouquet { Name = "Смешанный букет", Price = 500 },
                    new Bouquet { Name = "Букет из роз", Price = 700 },
                    new Bouquet { Name = "Полянка цветов", Price = 600 },
                    new Bouquet { Name = "Весенняя нежность", Price = 800 },
                    new Bouquet { Name = "Влюбленность", Price = 900 },
                    new Bouquet { Name = "Летний вайб", Price = 600 }
                });
            }

            // Добавляем новости
            if (!context.News.Any())
            {
                context.News.AddRange(new List<New>
                {
                    new New { Linq="https://i.pinimg.com/736x/65/57/f3/6557f31f1326dd9eebbaf08841d2f13b.jpg",Content = "Новинка сезона: летние цветы!" },
                    new New { Linq="https://megacvet24.ru/image/catalog/Blog/kak-vybrat-buket-na-14-fevralja_3.jpg",Content = "Скидки на букеты в этом месяце!" },
                    new New { Linq="https://avatars.mds.yandex.net/get-altay/927353/2a00000187a13ec791f0ff8b7ae52b925dba/XXL_height",Content = "Специальное предложение: 20% на все цветы!" }
                });
            }

            // Проверка и добавление заказов
            if (!context.Orders.Any())
            {
                context.Orders.AddRange(new List<Order>
                {
                    new Order { Name = "Алексей", LastName = "Иванов", PhoneNumber = "+7 (900) 999-99-99", Address = "Москва, ул. Пушкина, д. 1", PaymentType = "Картой сейчас", OrderText = "Готовый букет: Смешанный букет", Price="600 ₽" },
                    new Order { Name = "Мария", LastName = "Петрова", PhoneNumber = "+7 (900) 999-99-88", Address = "Санкт-Петербург, ул. Ленина, д. 2", PaymentType = "Наличные курьеру", OrderText = "Собрать букет: Роза-4, Лилия-3", Price="700 ₽" },
                    new Order { Name = "Дмитрий", LastName = "Сидоров", PhoneNumber = "+7 (900) 999-99-77", Address = "Екатеринбург, ул. Гоголя, д. 3", PaymentType = "Картой курьеру", OrderText = "Не важно: 500 ₽", Price="500 ₽" }
                });
            }

            // Сохраняем изменения в базе данных
            context.SaveChanges();
        }
    }
}
