import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getAll } from '../services/ProductService';

function ProductListView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll().then((products) => setProducts(products));
  }, []);

  return (
    <ul>
      {products?.length > 0 ? (
        products.map((product) => (
          <li key={`products_${product.id}`}>
            <ProductCard style={{ marginBottom: '1rem' }} product={product} />
          </li>
        ))
      ) : (
        <h3>Kunde inte hämta produkter</h3>
      )}
    </ul>
  );
}

export default ProductListView;