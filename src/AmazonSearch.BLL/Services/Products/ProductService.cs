using AmazonSearch.BLL.DTO.Products;
using AmazonSearch.DAL.Entities;
using AmazonSearch.DAL.Repositories;
using Microsoft.Extensions.Caching.Memory;

namespace AmazonSearch.BLL.Services.Products;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMemoryCache _cache;
    
    private const string TopBrandsCacheKey = "Top10Brands";
    private const string TopCategoriesCacheKey = "Top10Categories";

    public ProductService(IProductRepository productRepository, IMemoryCache cache)
    {
        _productRepository = productRepository;
        _cache = cache;
    }

    public async Task<IEnumerable<Product>> GetProductsAsync(SearchProductRequest request, 
        CancellationToken cancellationToken)
    {
        int validPage = request.Page < 1 ? 1 : request.Page;
        int validPageSize = request.PageSize > 100 ? 100 : request.PageSize;

        return await _productRepository.SearchProductsAsync(request.TypedWord, validPage, validPageSize, cancellationToken);
    }

    public async Task<IEnumerable<string>> GetTopBrandsAsync(CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue(TopBrandsCacheKey, out IEnumerable<string>? topBrands))
        {
            topBrands = await _productRepository.GetTopBrandsAsync(10, cancellationToken);
            _cache.Set(TopBrandsCacheKey, topBrands, TimeSpan.FromMinutes(30));
        }
        return topBrands ?? [];
    }

    public async Task<IEnumerable<string>> GetTopCategoriesAsync(CancellationToken cancellationToken)
    {
        if (!_cache.TryGetValue(TopCategoriesCacheKey, out IEnumerable<string>? topCategories))
        {
            topCategories = await _productRepository.GetTopCategoriesAsync(10, cancellationToken);
            _cache.Set(TopCategoriesCacheKey, topCategories, TimeSpan.FromMinutes(30));
        }
        return topCategories ?? [];
    }
}