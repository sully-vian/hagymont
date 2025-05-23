import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Shop.css';
import Navbar from '../components/Navbar/Navbar';

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

  const handleBasket = () => {
    if (username==='Not connected'){
      navigate('/login');
    }else{
      navigate(`/basket`);
    }
  };

  return (
    <div className="Shop">
      <Navbar />
      <div id="Header" className="mt-10">
        <div id="Searchbar">
          <input type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if(e.key=== 'Enter') handleSearch();}}
          placeholder="Search for a product..."/>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div id="Price-filter">
          <p>Filter by price</p>
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
        <div id="User-infos">
          <p> {username}</p>
          <button id="Basket_button"
            onClick={handleBasket}>Basket</button>
        </div>
      </div>
      <div id="Body">
        <Outlet context={{minPrice, maxPrice}}/>
      </div>
    </div>
  );
}

export default Shop;
