using System.IO;
using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private const string whSecret = "whsec_bktq8uhEguX2VRMW93IhhhfrVlLskjJt";
        private readonly IMapper _mapper;
        private readonly ILogger<IPaymentService> _logger;
        public PaymentsController(IPaymentService paymentService, IMapper mapper, ILogger<IPaymentService> logger)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var result = await _paymentService.CreateOrUpdatePaymentIntentAsync(basketId);
            if (result == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));
            return result;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, HttpContext.Request.Headers["Stripe-Signature"], whSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent) stripeEvent.Data.Object;
                    _logger.LogInformation("Payment succedded: {0}", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceededAsync(intent.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent) stripeEvent.Data.Object;
                    _logger.LogInformation("Payment failed: {0}", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailedAsync(intent.Id);
                    break;
            }
            return new EmptyResult();
        }
    }
}