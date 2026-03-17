import type {Product, SearchProductRequest} from "../types/product.ts";
import {useEffect, useState} from "react";
import {fetchProducts} from "../api/productApi.ts";


export const useProducts = (request: SearchProductRequest) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const abortController = new AbortController();

        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProducts(request);
                if (!abortController.signal.aborted) {
                    setProducts(data);
                }
            } catch (err: any) {
                if (!abortController.signal.aborted) setError(err.message);
            } finally {
                if (!abortController.signal.aborted) setLoading(false);
            }
        };

        loadProducts();

        return () => {
            abortController.abort();
        };
    }, [request.typedWord, request.page, request.pageSize]);
    
    return {products, loading, error};
};