import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import './style/Shop.css';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from './components/SearchBar';

function Shop() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); 
  const [category, setCategory] = useState('all'); 

  const handleChanges = (changes) => {
    setMinPrice(changes.min);
    setMaxPrice(changes.max);
    setCategory(changes.category);
  };

  return (
    <div>
      <Navbar />
      <SearchBar onChanges={handleChanges}/>
      <Outlet context={{minPrice, maxPrice, category}}/>
    </div>
  );
}

export default Shop;
