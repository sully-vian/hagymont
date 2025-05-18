import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../utils/UserService';
import './Basket.css';

function Basket() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);
  const username = sessionStorage.getItem("username");

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR');
  };

  const getImage = (id) => {
    try {
      return require(`../assets/images/product${id}.png`);
    } catch (err) {
      return require(`../assets/images/default.png`);
    }
  };

  const actualise = useCallback(() => {
    UserService.getRequest(`/baskets/current/${username}`)
      .then(response => {
        setBasket(response.data);
        setPurchases(response.data.products || []);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  }, [username, navigate]);

  useEffect(() => {
    actualise();
  }, [actualise]);

  useEffect(() => {
    if (purchases && purchases.length > 0) {
      const total = purchases.reduce((acc, current) => {
        const price = current?.product?.price ?? 0;
        const quantity = current?.quantity ?? 0;
        return acc + price * quantity;
      }, 0);
      const count = purchases.reduce((acc, current) => acc + (current?.quantity ?? 0), 0);
      setTotalPrice(total);
      setNbItems(count);
    } else {
      setTotalPrice(0);
      setNbItems(0);
    }
  }, [purchases]);

  const handleDelete = (productId) => {
    UserService.deleteRequest(`/baskets/delete-product/${basket.id}/${productId}`)
      .then(() => actualise())
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  };

  const handleQuantityChange = (productId, quantity) => {
    UserService.patchRequest(`/baskets/change-quantity/${basket.id}`, { productId, quantity: parseInt(quantity) })
      .then(() => actualise())
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  };

  const handleShop = () => {
    navigate('/products');
  };

  const handleValidate = () => {
    UserService.patchRequest(`/baskets/update/${basket.id}`, { status: "confirmed" })
      .then(() => {
        console.log("Validé !!");
        actualise();
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', { state: error.status });
      });
  };

  return (
    <div id="basket">
      <div className="header">
        <button className="shop-button" onClick={handleShop}>Shop</button>
        <p className="username">{username}</p>
      </div>

      <div className="basket-infos">
        <h1>Your basket</h1>
        {basket && <p>Created at : {printDate(basket.createdAt)}</p>}
      </div>

      <hr />

      {!purchases || purchases.length === 0 ? (
        <div id="empty-list">
          <p>No product in your basket yet !</p>
          <button className="shop-button" onClick={handleShop}>Buy something</button>
        </div>
      ) : (
        purchases.map(purchase =>
          <div className='list-item' key={purchase.id}>
            <div
              className="product-item"
              onClick={() => navigate(`/products/${purchase?.product?.id}`)}
            >
              <div className="product-image">
                <img 
                  src={getImage(purchase?.product?.id)} 
                  alt={purchase?.product?.name || "Product image"} 
                />
              </div>
              <p className="name-product">{purchase?.product?.name}</p>
            </div>
            <div className="purchase-actions">
              <div className="purchase-infos">
                <p className="price-product">{purchase?.product?.price ?? 0}€</p>
                <input
                  className="quantity-input"
                  type="number"
                  value={purchase?.quantity ?? 1}
                  min={1}
                  onChange={e => handleQuantityChange(purchase?.product?.id, e.target.value)}
                />
              </div>
              <button className="delete-button" onClick={() => handleDelete(purchase?.product?.id)}>
                Delete item
              </button>
            </div>
          </div>
        )
      )}

      {purchases && (
        <div className="basket-recap">
          <hr />
          <p>Your total ({nbItems} item{nbItems > 1 ? 's' : ''}) : <strong>{totalPrice} €</strong></p>
          <button className="validate-button" onClick={handleValidate}>Validate basket</button>
        </div>
      )}
    </div>
  );
}

export default Basket;