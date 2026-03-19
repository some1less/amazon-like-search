using AmazonSearch.BLL.Services.Products;
using Microsoft.AspNetCore.Mvc;

namespace AmazonSearch.API.Controllers;

[ApiController]
[Route("api/filters")]
public class FilterController : ControllerBase
{
    private readonly IProductService _productService;

    public FilterController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("brands/top")]
    public async Task<IActionResult> GetTopBrands(CancellationToken ct)
    {
        var brands = await _productService.GetTopBrandsAsync(ct);
        return Ok(brands);
    }

    [HttpGet("categories/top")]
    public async Task<IActionResult> GetTopCategories(CancellationToken ct)
    {
        var categories = await _productService.GetTopCategoriesAsync(ct);
        return Ok(categories);
    }
}