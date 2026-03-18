// src/components/product/ProductGrid.tsx
import { ProductCard } from './ProductCard';
import './ProductGrid.css';
import type {Product} from "../../types/product.ts";

interface Props {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export const ProductGrid = ({ products, loading, error }: Props) => {
    if (error) {
        return (
            <div className="grid-status-message error">
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="grid-status-message">
                <div className="spinner"></div>
                <p>Loading your groceries...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="grid-status-message">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};