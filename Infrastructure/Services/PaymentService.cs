using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;
using Product = Core.Entities.Product;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _config;
        public PaymentService(IBasketRepository basketRepository, IUnitOfWork uow, IConfiguration config)
        {
            this._config = config;
            this._uow = uow;
            this._basketRepository = basketRepository;
        }
        public async Task<CustomerBasket> CreateOrUpdatePaymentIntentAsync(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            var basket = await _basketRepository.GetBasketAsync(basketId);

            if(basket == null) return null;

            if (basket.DeliveryMethodId.HasValue) 
            {
                var deliverMethod = await _uow.Repository<DeliveryMethod>().GetByIdAsync(basket.DeliveryMethodId.Value);
                basket.ShippingPrice = deliverMethod.Price;
            }

            foreach (var item in basket.Items)
            {
                var productItem = await _uow.Repository<Product>().GetByIdAsync(item.Id);
                if (item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }
            var service = new PaymentIntentService();
            PaymentIntent intent;
            if (string.IsNullOrWhiteSpace(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(basket.Items.Sum(x => x.Quantity * (x.Price * 100)) + (basket.ShippingPrice * 100)),
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> {"card"}
                };
                intent = await service.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long)(basket.Items.Sum(x => x.Quantity * (x.Price * 100)) + (basket.ShippingPrice * 100)),
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            await _basketRepository.UpdateBasketAsync(basket);
            return basket;
        }

        public async Task<Order> UpdateOrderPaymentFailedAsync(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _uow.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return null;
            order.Status = OrderStatus.PaymentFailed;
            await _uow.CompleteAsync();
            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceededAsync(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _uow.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return null;
            order.Status = OrderStatus.PaymentReceived;
            await _uow.CompleteAsync();
            return order;
        }
    }
}