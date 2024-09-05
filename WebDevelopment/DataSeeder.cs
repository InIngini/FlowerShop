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
                    new New { Content = "Новинка сезона: летние цветы!" },
                    new New { Content = "Скидки на букеты в этом месяце!" },
                    new New { Content = "Специальное предложение: 20% на все цветы!" }
                });
            }

            // Сохраняем изменения в базе данных
            context.SaveChanges();
        }
    }
}
