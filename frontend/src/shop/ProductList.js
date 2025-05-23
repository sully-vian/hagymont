import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import UserService from '../utils/UserService';
import './ProductList.css';
import ShopItem from './components/ShopItem';

function ProductList(){
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    UserService.getRequest(`/products${filter}`).then((response) => {
      setProducts(response.data);
    });
  }, [searchTerm]);

  return (
    <div id="shop-products-list">
      {filteredProducts.length === 0 ? (
        <div className="empty-list">
          <p>No products match your search...</p>
        </div>
      ) : (
        filteredProducts.map(product =>
          <ShopItem key={product.id} product ={product}/>
        )
      )}
    </div>
  );
  }
export default ProductList;
