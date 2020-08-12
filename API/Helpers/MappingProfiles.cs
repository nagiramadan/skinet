using API.Dtos;
using AutoMapper;
using Core.Entities;

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
        }
    }
}