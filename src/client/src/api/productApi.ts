import type {Product, SearchProductRequest} from "../types/product.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5234';
const API_URL = `${BASE_URL}/api/products`;
const FILTER_API_URL = `${BASE_URL}/api/filters`;

export const fetchProducts = async (request: SearchProductRequest) : Promise<Product[]> => {
    const url = new URL(`${API_URL}/search`);

    url.searchParams.append('page', request.page.toString());
    url.searchParams.append('pageSize', request.pageSize.toString());

    if (request.typedWord){
        url.searchParams.append('TypedWord', request.typedWord);
    }

    if (request.brands && request.brands.length > 0) {
        request.brands.forEach(brand => url.searchParams.append('Brands', brand));
    }

    if (request.categories && request.categories.length > 0) {
        request.categories.forEach(category => url.searchParams.append('Categories', category));
    }

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

    return response.json();
}


export const fetchTopBrands = async (): Promise<string[]> => {
    const response = await fetch(`${FILTER_API_URL}/brands/top`);
    if (!response.ok) throw new Error("Failed to fetch top brands");
    return response.json();
}

export const fetchTopCategories = async (): Promise<string[]> => {
    const response = await fetch(`${FILTER_API_URL}/categories/top`);
    if (!response.ok) throw new Error("Failed to fetch top categories");
    return response.json();
}