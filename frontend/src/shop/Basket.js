import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Shop.css';

function Basket() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const totalPrice = products.map((product) => {product.getPrice()}); //TODO somme prix

  const handleDelete = (productId) => {
    //TODO requete supprimer produit du panier
  };

  return (
    <div className="Products-list">
      {products.length===0 ? (
        <div id="Nothing-found">
          <p>Aucun produit ne correspond à votre recherche...</p>
        </div>
      ) : ( products.map(product =>
          <div id='Item-list'>
            <div className="Product" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
            </div>
            <button id='Retirer' onClick={handleDelete(product.id)}>Retirer</button>
            <input type='number'></input>
          </div>
      ))}
    </div>
  );
}

export default Basket;
