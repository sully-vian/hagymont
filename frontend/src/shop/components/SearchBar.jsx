import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterCard from './FilterCard';
import filterIcon from '../../assets/filter.png';

function SearchBar({ onChanges }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [changes, setChanges] = useState({});
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username') || 'Not connected';

    const handleSearch = () => {
        if (searchTerm === '') {
            navigate('/products');
        } else {
            navigate(`/products/name?contains=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleChanges = (e) => {
        const { name, value } = e.target;
        const newChanges = { ...changes, [name]: value };
        setChanges(newChanges);
        onChanges(newChanges);
        console.log(newChanges);
    };

    const [showFilter, setShowFilter] = useState(false);

    const handleBasket = () => {
        navigate(username === 'Not connected' ? '/login' : '/basket');
    };

    return (
        <div className="mt-10 w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row flex-wrap gap-4 justify-between items-center bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
            {/* Search input */}
            <div className="flex items-center gap-3 flex-1 w-full lg:w-auto">
                <input
                    type="search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                    placeholder="Search by product name or keyword..."
                    className="flex-grow px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-sm transition"
                />
                <button
                onClick={handleSearch}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm shadow transition"
                >
                Search
                </button>

            </div>

            {/* Filter by type */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700"><strong>Category:</strong></span>
                <select
                    name="category"
                    value={changes.category || ''}
                    onChange={handleChanges}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm"
                >
                    <option value="">All</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Towel">Towel</option>
                    <option value="Dumbbells">Dumbbells</option>
                    <option value="Protein">Protein</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>

            {/* Price Filter */}

            <div className="flex items-center">
                <button
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray rounded text-base transition duration-300 flex items-center gap-1"
                >
                    <img src={filterIcon} alt="Filter icon" className="w-4 h-4" />
                    <span>Filter</span>
                </button>

                {showFilter && (
                    <FilterCard
                    changes={changes}
                    handleChanges={handleChanges}
                    onClose={() => setShowFilter(false)}
                    />
                )}
                </div>


            {/* User + Basket */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-800">{username}</span>
                <button
                    onClick={handleBasket}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-2xl text-sm shadow transition"
                >
                    Basket
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
