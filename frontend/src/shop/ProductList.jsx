import { useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import apiService from '../utils/APIService';
import ShopItem from './components/ShopItem';

function ProductList(){
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('contains') || null;

  const { minPrice, maxPrice } = useOutletContext();

  const filteredProducts = products.filter((product) => {
  const min = minPrice === '' ? 0 : parseFloat(minPrice) || 0;
  const max = maxPrice === '' ? Infinity : parseFloat(maxPrice) || Infinity;
  return product.price >= min && product.price <= max;
});

  useEffect(() => {
  const filter = searchTerm ? `/name?contains=${encodeURIComponent(searchTerm)}` : '';
    apiService.getRequest(`/products${filter}`)
    .then((response) => {
      setProducts(response.data);
    });
  }, [searchTerm]);

  return (
    <div className="grid-auto-fill-180 gap-5 p-5">
      {filteredProducts.length === 0 ? (
        <div className="col-span-full text-center italic text-gray-500 py-10">
          <p>No products match your search...</p>
        </div>
      ) : (
        filteredProducts.map(product => (
          <ShopItem key={product.id} product={product} />
        ))
      )}
    </div>
  );
  }
export default ProductList;
