using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntentAsync(string basketId);
        Task<Order> UpdateOrderPaymentSucceededAsync(string paymentIntentId);
        Task<Order> UpdateOrderPaymentFailedAsync(string paymentIntentId);
    }
}