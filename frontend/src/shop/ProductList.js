import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import UserService from '../utils/UserService';
import './ProductList.css';

function ProductList(){
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('contains') || null;

  const { minPrice, maxPrice } = useOutletContext();

  const getImage = (id) => {
    try {
      return require(`../assets/images/product${id}.png`);
    } catch (err) {
      return require(`../assets/images/default.png`); // Image de secours si elle n'existe pas
    }
  };

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
    <div id="shop-products-list">
      {filteredProducts.length === 0 ? (
        <div className="empty-list">
          <p>No products match your search...</p>
        </div>
      ) : (
        filteredProducts.map(product =>
          <div className="product-item" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
            <div className="product-image">
              <img src={getImage(product.id)} alt={product.name} />
            </div>
            <div className="product-name">
              <p>{product.name}</p>
            </div>
            <div className="product-stock">
              <p>{product.price}€</p>
              <p>Stock: {product.stock}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
  }
export default ProductList;
