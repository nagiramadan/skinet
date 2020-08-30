using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            this._mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Create(OrderDto model)
        {
            var email = HttpContext.User.RetrieveEmailFromPrinciple();
            var address = _mapper.Map<Address>(model.ShipToAddress);
            var order = await _orderService.CreateOrderAsync(email, model.DeliveryMethodId, model.BasketId, address);
            
            if(order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            return order;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrinciple();
            var orders = await _orderService.GetOrdersForUsersAsync(email);
            return Ok(_mapper.Map<List<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUSer(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrinciple();

            var order = await _orderService.GetOrderById(id, email);
            if(order == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            var result = await _orderService.GetDeliveryMethodsAsync();
            return Ok(result);
        }
    }
}