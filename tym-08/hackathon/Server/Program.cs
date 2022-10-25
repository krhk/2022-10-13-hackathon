
using hackathon.Server.Api;
using hackathon.Server.Db;
using Microsoft.EntityFrameworkCore;

namespace hackathon
{
    public class Program
    {
        public static void Main(string[] args)
        {
            
            ApiBase.SetData("Zamky", "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Z%C3%A1mky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
            ApiBase.SetData("TechnickePamatky", "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Technick%C3%A9_pam%C3%A1tky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
            ApiBase.SetData("Cirkevnipamatky", "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/C%C3%ADrkevn%C3%AD_pam%C3%A1tky/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
            ApiBase.SetData("Muzea", "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Muzea_a_galerie/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
            ApiBase.SetData("Hrady", "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Hrady/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
            ApiBase.SetData("ZabavniCentra", "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Z%C3%A1bavn%C3%AD_centra/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");

            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.

            builder.Services.AddControllersWithViews();
            builder.Services.AddRazorPages();
            
            builder.Services.AddDbContext<Dbcontext>(opt =>
            opt.UseSqlServer(
                builder.Configuration["DatabaseConnection"]));

            var app = builder.Build();
            //app.Urls.Add("https://0.0.0.0:44398");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseWebAssemblyDebugging();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseBlazorFrameworkFiles();
            app.UseStaticFiles();
            
            app.UseRouting();

          

            app.MapRazorPages();
            app.MapControllers();
            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}