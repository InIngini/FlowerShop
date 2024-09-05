﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebDevelopment.BLL.Errors;
using WebDevelopment.BLL.Interfaces;
using WebDevelopment.BLL.Services;
using WebDevelopment.DB;

namespace WebDevelopment
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Добавление поддержки контроллеров и представлений
            services.AddControllersWithViews();

            // Настройка контекста базы данных с использованием строки подключения
            services.AddDbContext<Context>(options =>
                options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IFlowerService, FlowerService>();
            services.AddScoped<IBouquetService, BouquetService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<INewService, NewService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            // Миддлвейр для обработки ошибок
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseHttpsRedirection();
            app.UseStaticFiles(); // Для поддержки статических файлов

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            // Вызов метода Seed
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<Context>();
                DataSeeder.Seed(context);
            }
        }
    }
}
