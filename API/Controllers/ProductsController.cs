using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRep,
        IGenericRepository<ProductBrand> brandRepo, IGenericRepository<ProductType> typeRepo,
        IMapper mapper)
        {
            this._mapper = mapper;
            this._brandRepo = brandRepo;
            this._typeRepo = typeRepo;
            this._productRepo = productRep;

        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            var spec = new ProductWithTypesAndBrandsSpecification();
            var products = await _productRepo.ListAsync(spec);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetById(int id)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            return Ok(_mapper.Map<ProductToReturnDto>(product));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<Product>>> GetProductBrands()
        {
            var products = await _brandRepo.ListAllAsync();
            return Ok(_mapper.Map<List<ProductToReturnDto>>(products));
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<Product>>> GetProductTypes()
        {
            var products = await _typeRepo.ListAllAsync();
            return Ok(products);
        }
    }
}