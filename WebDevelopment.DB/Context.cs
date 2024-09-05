using WebDevelopment.DB.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebDevelopment.DB
{
    /// <summary>
    /// Контекст базы данных для управления сущностями и их связями в базе данных.
    /// </summary>
    public class Context : DbContext
    {
        /// <summary>
        /// Инициализирует новый экземпляр <see cref="Context"/> с заданными параметрами.
        /// </summary>
        /// <param name="options">Параметры для настройки контекста.</param>
        public Context(DbContextOptions<Context> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
            //Database.Migrate();
        }
        /// <summary>
        /// Конфигурирует параметры контекста базы данных.
        /// </summary>
        /// <param name="optionsBuilder">Объект, используемый для задания параметров.</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(System.Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        public DbSet<Bouquet> Bouquets { get; set; }
        public DbSet<Flower> Flowers { get; set; }
        public DbSet<New> News { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}
