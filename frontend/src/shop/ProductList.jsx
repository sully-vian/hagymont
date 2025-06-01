import { useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import apiService from '../utils/APIService';
import ShopItem from './components/ShopItem';

function ProductList() {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('contains') || null;

  const { minPrice, maxPrice, category } = useOutletContext();

  const filteredProducts = products.filter((product) => {
  const min = minPrice === '' ? 0 : parseFloat(minPrice) || 0;
  const max = maxPrice === '' ? Infinity : parseFloat(maxPrice) || Infinity;
  const categoryFilter = category === 'all' || category === product.category;
  return product.price >= min && product.price <= max && categoryFilter;
});

  useEffect(() => {
    const filter = searchTerm ? `/name?contains=${encodeURIComponent(searchTerm)}` : '';
    apiService.getRequest(`/products${filter}`)
      .then((response) => {
        setProducts(response.data);
      });
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#fdfdfb] px-6 py-8 text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-amber-600">
          🛍️ Elite Club Boutique
        </h1>
        <p className="text-gray-600 text-sm mt-1 italic">
          Handpicked luxury fitness items
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center italic text-gray-500 py-10 text-sm">
            No products match your search...
          </div>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition duration-150"
            >
              <ShopItem product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
