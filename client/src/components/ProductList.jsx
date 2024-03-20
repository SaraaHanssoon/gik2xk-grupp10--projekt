import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getAll } from '../services/ProductService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false); // Ny state för att hantera fel

  useEffect(() => {
    getAll()
      .then((products) => {
        setProducts(products);
        setError(false); // Nollställer felstatus vid framgångsrik hämtning
      })
      .catch((err) => {
        console.error("Fel vid hämtning av produkter:", err);
        setError(true); // Sätter felstatus om ett fel inträffar
      });
  }, []);

  if (error) {
    return <h3>Kunde inte hämta produkter. Försök igen senare.</h3>; // Visar ett felmeddelande om ett fel inträffar
  }

  return (
    <ul>
      {products.length > 0 ? (
        products.map((product) => (
          <li key={`products_${product.id}`}>
            {/* Om styling är nödvändig, överväg att implementera det inuti ProductCard eller använd en omslutande div här. */}
            <ProductCard product={product} />
          </li>
        ))
      ) : (
        <h3>Inga produkter tillgängliga</h3> // Uppdaterat meddelande för konsistens
      )}
    </ul>
  );
}

export default ProductList;
