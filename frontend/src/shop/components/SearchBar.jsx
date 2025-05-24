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
        <div className="mt-10 flex flex-wrap gap-5 justify-between mb-8 bg-white p-5 rounded-lg shadow-md">
            {/* Searchbar */}
            <div className="flex items-center gap-3 flex-1">
            <input
                type="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                placeholder="Search for a product..."
                className="px-4 py-2 w-full rounded border border-gray-300 text-base"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-base transition duration-300"
            >
                Search
            </button>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2 justify-end">
            <p className="text-base text-gray-700 m-0">Filter by price</p>
            <input
                name="min"
                type="number"
                placeholder="min"
                min={0}
                value={changes.min}
                onChange={handleChanges}
                className="px-3 py-2 w-[80px] rounded border border-gray-300 text-base"
            />
            <p className="text-base text-gray-700">-</p>
            <input
                name="max"
                type="number"
                placeholder="max"
                min={0}
                value={changes.max}
                onChange={handleChanges}
                className="px-3 py-2 w-[80px] rounded border border-gray-300 text-base"
            />
            <p className="text-base text-gray-700">€</p>
            </div>

            {/* User Infos */}
            <div className="flex items-center gap-3">
            <p className="text-base text-gray-800 m-0">{username}</p>
            <button
                onClick={handleBasket}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded text-base transition duration-300"
            >
                Basket
            </button>
            </div>
        </div>
    );

}

export default SearchBar;