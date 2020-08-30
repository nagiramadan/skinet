using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContexSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if(!context.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText("../Infrastructure/data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    await context.ProductBrands.AddRangeAsync(brands);
                }

                if(!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("../Infrastructure/data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    await context.ProductTypes.AddRangeAsync(types);
                }

                if(!context.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    await context.Products.AddRangeAsync(products);
                }

                if(!context.DeliveryMethods.Any())
                {
                    var dmData = File.ReadAllText("../Infrastructure/data/SeedData/delivery.json");
                    var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                    await context.DeliveryMethods.AddRangeAsync(deliveryMethods);
                }

                await context.SaveChangesAsync();
            }
            catch (System.Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContexSeed>();
                logger.LogError(ex, "An error occured during seeding");
            }
        }
    }
}