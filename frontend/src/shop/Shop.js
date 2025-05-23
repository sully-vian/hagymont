import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Shop.css';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from './components/SearchBar';

function Shop() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); 

  const handleChanges = (changes) => {
    setMinPrice(changes.min);
    setMaxPrice(changes.max);
  };

  return (
    <div className="Shop">
      <Navbar />
      <SearchBar onChanges={handleChanges}/>
      <div id="Body">
        <Outlet context={{minPrice, maxPrice}}/>
      </div>
    </div>
  );
}

export default Shop;
