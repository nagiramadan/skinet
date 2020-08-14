using Core.Entities;

namespace Core.Specifications
{
    public class ProductForFilterCountSpecification : BaseSpecification<Product>
    {
        public ProductForFilterCountSpecification(ProductSpecParams productParams)
            : base(x => 
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) && 
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (string.IsNullOrWhiteSpace(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)))
        {
            
        }
    }
}