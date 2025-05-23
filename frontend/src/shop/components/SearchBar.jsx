import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({onChanges}){
    const [searchTerm, setSearchTerm] = useState('');
    const username =  sessionStorage.getItem("username")!=null ? sessionStorage.getItem("username") : "Not connected";
    const [changes, setChanges] = useState({});
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm===''){
        navigate('/products');
        }else{
        navigate(`/products/name?contains=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleChanges = (e) => {
        const newChanges = ({
        ...changes,
        [e.target.name]: e.target.value
        });
        setChanges(newChanges);
        onChanges(newChanges);
    };

    const handleBasket = () => {
        if (username==='Not connected'){
        navigate('/login');
        }else{
        navigate(`/basket`);
        }
    };

    return (
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
          <input name="min" 
            type="number" 
            placeholder='min' 
            min={0}
            value={changes.min}
            onChange={handleChanges}
          ></input>
          <p> - </p>
          <input name="max" 
            type="number" 
            placeholder='max' 
            min={0}
            value={changes.max}
            onChange={handleChanges}
          ></input>
          <p> €</p>
        </div>
        <div id="User-infos">
          <p> {username}</p>
          <button id="Basket_button"
            onClick={handleBasket}>Basket</button>
        </div>
      </div>
    )
}

export default SearchBar;