using AmazonSearch.BLL.DTO.Products;
using AmazonSearch.DAL.Entities;

namespace AmazonSearch.BLL.Services.Products;

public interface IProductService
{
    Task<IEnumerable<Product>> GetProductsAsync(SearchProductRequest request, CancellationToken ct);
    Task<IEnumerable<string>> GetTopBrandsAsync(CancellationToken cancellationToken);
    Task<IEnumerable<string>> GetTopCategoriesAsync(CancellationToken cancellationToken);
}