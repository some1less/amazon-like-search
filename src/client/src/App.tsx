import { useUrlState } from './hooks/useUrlState';
import { useProducts } from './hooks/useProducts';
import { Toolbar } from './components/toolbar/Toolbar';
import { ProductGrid } from './components/product/ProductGrid';

function App() {
    const { requestParams, updateSearch, updatePage, updatePageSize } = useUrlState();

    const { products, loading, error } = useProducts(requestParams);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <h1 style={{ fontFamily: 'system-ui, sans-serif', fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '20px', marginTop: '60px' }}>
                What do you want to find?
            </h1>

            <Toolbar
                initialQuery={requestParams.typedWord || ''}
                onSearch={updateSearch}
                page={requestParams.page}
                onPageChange={updatePage}
                pageSize={requestParams.pageSize}
                onPageSizeChange={updatePageSize}
            />

            <ProductGrid
                products={products}
                loading={loading}
                error={error}
            />

        </div>
    );
}

export default App;