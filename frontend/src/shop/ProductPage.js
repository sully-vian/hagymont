import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Shop.css';
import UserService from '../utils/UserService';

function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getRequest(`/api/products/${id}`)
    .then(response => {
      setProduct(response.data);
    })
    .catch(error => {
      console.error('Erreur détectée :', error);
      navigate('/error', {"state":error.status});
    });
  }, [id]);

  if (!product) return <p>Chargement du produit...</p>;
  return (

      <div>
        <h1>{product.name}</h1>
        <div className="Details-product">
          <div>Image</div>
          <p> {product.price} € </p>
          <p> {product.description} </p>
          <button>Ajouter au panier</button>
        </div>
      </div>
  );
}
export default ProductPage;
