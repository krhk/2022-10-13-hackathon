using hackathon.Client;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Blazored.LocalStorage;
using hackathon.Shared.Models;
using System.Collections.ObjectModel;

namespace hackathon.Client
{
    public class SingletonStorageModel
    {
        public Dictionary<string, List<ApiData>>? model { get; set; }

        public List<Trip>? trips { get; set; }

        public dbUser? user { get; set; }
    }

    public class Program
    {

        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");
            builder.RootComponents.Add<HeadOutlet>("head::after");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            builder.Services.AddSingleton<SingletonStorageModel>();

            builder.Services.AddBlazoredLocalStorage(config => config.JsonSerializerOptions.WriteIndented = true);

            await builder.Build().RunAsync();
        }
    }
}