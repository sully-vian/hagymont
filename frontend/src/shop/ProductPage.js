import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../utils/UserService';
import './ProductPage.css';

function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const username =  sessionStorage.getItem("username")
  const [message, setMessage] = useState('');

  const getImage = (id) => {
    try {
      return require(`../assets/images/product${id}.png`);
    } catch (err) {
      return require(`../assets/images/default.png`); // Image de secours si elle n'existe pas
    }
  };

  useEffect(() => {
    UserService.getRequest(`/products/${id}`)
    .then(response => {
      setProduct(response.data);
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  }, [id, navigate]); 

  const handlePurchase = (productId) => {
    UserService.postRequest(`/baskets/add-product/${username}`, {
      productId,
      quantity: 1
    })
    .then(response => {
      setMessage("Product added to your shopping basket !");
      setTimeout(() => setMessage(''), 2000);
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  };

  if (!product) {
  return (
    <div className="loading-product">
      <p>Loading product page...</p>
      <button onClick={() => navigate(-1)}>Return to Previous Page</button>
    </div>
  );
}
  return (
    <div id="product-page">
      <div className="product-header">
        <div className="product-image">
          <img 
            src={getImage(product.id)} 
            alt={product.name || "Product image"} 
          />
        </div>
        <div className="product-info">
          <div className="product-name">
            <h1>{product.name}</h1>
          </div>
          <div className="purchase-info">
            <div className="product-stock">
              <p>{product.price} €</p>
              {product.stock>0 ? <p className="in-stock">In Stock</p>: <p className="out-stock">Out of Stock</p>}
            </div>
            <div className="basket-button">
              <button onClick={() => handlePurchase(product.id)}>Add to basket</button>
              {message && <p>{message}</p>}
            </div>
          </div>
          <hr></hr>
          <div className="product-details">
            <h2>Details</h2>
            <div className="product-description">
              {product.description.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
