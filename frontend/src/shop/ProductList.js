import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import './Shop.css';
import UserService from '../utils/UserService';

function ProductList(){
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('contains') || null;

  const { minPrice, maxPrice } = useOutletContext();

  const filteredProducts = products.filter((product) => {
    let min = minPrice==='' ? 0 : minPrice
    let max = maxPrice==='' ? Number.MAX_SAFE_INTEGER : maxPrice
    return product.price >= min && product.price <= max;
  });

  useEffect(() => {
    const filter = searchTerm ? `/name?contains=${encodeURIComponent(searchTerm)}` : '';
    UserService.getRequest(`/api/products${filter}`).then((response) => {
      setProducts(response.data);
    });
  }, [searchTerm]);

  return (
    <div className="Products-list">
      {filteredProducts.length===0 ? (
        <div id="Nothing-found">
          <p>Aucun produit ne correspond à votre recherche...</p>
        </div>
      ) : ( filteredProducts.map(product =>
          <div className="Product" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
            <h3>{product.name} - {product.price}€</h3>
            {product.description}
          </div>
      ))}
    </div>
  );
  }
export default ProductList;
