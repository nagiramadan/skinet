using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(x => x.ProductType, x => x.MapFrom(x => x.ProductType.Name))
                .ForMember(x => x.ProductType, x => x.MapFrom(x => x.ProductType.Name))
                .ForMember(x => x.PictureUrl, x => x.MapFrom<ProductUrlResolver>());
            
            CreateMap<ProductBrand, BrandToReturnDto>();
            CreateMap<ProductType, ProductTypeToReturnDto>();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}