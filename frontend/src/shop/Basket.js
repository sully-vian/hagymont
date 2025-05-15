import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Basket.css';
import UserService from '../utils/UserService';

function Basket() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const username =  sessionStorage.getItem("username")
  const totalPrice = purchases ? purchases.reduce((acc, current) => acc + current.product.price*current.quantity, 0,) : 0;
  const nbItems = purchases ? purchases.reduce((acc, current) => acc + current.quantity, 0,) : 0;

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  const getImage = (id) => {
    try {
      return require(`../assets/images/product${id}.png`);
    } catch (err) {
      return require(`../assets/images/default.png`); // Image de secours si elle n'existe pas
    }
  };

  useEffect(() => {
    UserService.getRequest(`/baskets/current/${username}`)
    .then(response => {
      console.log(sessionStorage.getItem("token"))
      setBasket(response.data);
      setPurchases(response.data.products)
      console.log(purchases)
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  }, []);

  const actualise = () => {
    console.log(purchases);
    UserService.getRequest(`/baskets/current/${username}`)
      .then(response => {
        setBasket(response.data);
        setPurchases(response.data.products);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
  }

  const handleDelete = (productId) => {
    UserService.deleteRequest(`/baskets/delete-product/${basket.id}/${productId}`)
    .then(_ => {
      actualise();
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    UserService.patchRequest(`/baskets/change-quantity/${basket.id}`, {productId, quantity:parseInt(quantity)})
    .then(_ => {
      actualise();
  })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  };

  const handleShop = () => {
    navigate('/products');
  };

  const handleValidate = () => {
    UserService.patchRequest(`/baskets/update/${basket.id}`, {status:"confirmed"})
    .then(_ => {
      console.log("Validé !!")
      //TODO amener vers la page de paiement avant de valider
      actualise();
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
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
        {basket ? (<p>Created at : {printDate(basket.createdAt)}</p>) : <></>}
      </div>
      <hr></hr>
      {!purchases || purchases.length===0 ? (
        <div id="empty-list">
          <p>No product in your basket yet !</p>
          <button className="shop-button" onClick={handleShop}>Buy something</button>
        </div>
      ) : ( 
        purchases.map(purchase =>
          <div className='list-item' key={purchase.id}>
            <div className="product-item" key={purchase.product.id} onClick={() => navigate(`/products/${purchase.product.id}`)}>
              <div className="product-image">
                <img src={getImage(purchase.product.id)}></img>
              </div>
              <p className="name-product">{purchase.product.name}</p>
            </div>
            <div className="purchase-actions">
              <div className="purchase-infos">
                <p className="price-product">{purchase.product.price}€</p>
                <input className="quantity-input" type='number' value={purchase.quantity} min={1} onChange={e => handleQuantityChange(purchase.product.id, e.target.value)}></input>
              </div>
              <button className='delete-button' onClick={() => handleDelete(purchase.product.id)}>Delete item</button>
            </div>
          </div>
      )
      )}
      {purchases ? (
        <div className="basket-recap">
          <hr></hr>
          <p>Your total ({nbItems} item{nbItems>1 ? 's' : ''}) : <strong>{totalPrice} €</strong></p>
          <button className="validate-button" onClick={() => handleValidate()}>Validate basket</button>
        </div>
      ) : (<></>)}
    </div>
  );
}

export default Basket;
