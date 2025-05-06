import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Shop.css';

function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const username =  sessionStorage.getItem("username")!=null ? sessionStorage.getItem("username") : "Not connected";
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm===''){
      navigate('/products');
    }else{
      navigate(`/products/name?contains=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="Shop">
      <h1>Boutique</h1>
      <div className="Header">
        <input type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if(e.key=== 'Enter') handleSearch();}}
          placeholder="Rechercher un produit..."/>
        <button onClick={handleSearch}>Rechercher</button>
        <div className="Header" id="Price-filter">
          <p>Filtrer par prix</p>
          <input id="min" type="number" placeholder='min' min={0}
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          ></input>
          <p> - </p>
          <input id="max" type="number" placeholder='max' min={0}
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          ></input>
          <p> €</p>
        </div>
        <div>{username}</div>
      </div>
      <div className="Body">
        <Outlet context={{minPrice, maxPrice}}/>
      </div>
    </div>
  );
}

export default Shop;
