import './ProductCard.css';
import type {Product} from "../../types/product.ts";

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
                ) : (
                    <div className="product-image-fallback">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                            <line x1="3" y1="3" x2="21" y2="21" stroke="#ccc" strokeWidth="1.5" opacity="0.6"></line>
                        </svg>
                        <span>No image</span>
                    </div>
                )}
            </div>

            <div className="product-content">
                <h3 className="product-name" title={product.name}>
                    {product.name || 'Unknown Product'}
                </h3>

                {product.brand && (
                    <p className="product-brand">{product.brand}</p>
                )}

                <div className="product-categories">
                    {product.categories?.slice(0, 3).map((cat, idx) => (
                        <span key={idx} className="category-tag">{cat}</span>
                    ))}
                    {(product.categories?.length || 0) > 3 && (
                        <span className="category-tag extra-tag">
                            +{product.categories.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};