import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterCard from './FilterCard';
import filterIcon from '../../assets/filter.png';
import SessionService from '../../utils/SessionService';

function SearchBar({ onChanges }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [changes, setChanges] = useState({category:'all'});
    const navigate = useNavigate();
    const username = SessionService.getUsername();
    const isAdmin = SessionService.getRole()==='admin';

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
        if (name === 'keyword'){
            setSearchTerm(value);
            if (value !== '') {
                navigate(`/products/name?contains=${encodeURIComponent(value)}`);
            } else {
                navigate('/products');
            }
        }
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
                <span className="text-sm text-gray-700"><strong>Keyword:</strong></span>
                <select
                    name="keyword"
                    value={changes.keyword || ''}
                    onChange={handleChanges}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm"
                >
                    <option value="">All</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Towel">Towel</option>
                    <option value="Dumbbells">Dumbbells</option>
                    <option value="Protein">Protein</option>
                    <option value="Sport">Sport</option>
                    <option value="Bag">Bag</option>
                    <option value="Capsules">Capsules</option>
                    <option value="Climbing">Climbing</option>
                    <option value="Swim">Swim</option>
                </select>
            </div>

            {/* Price Filter */}

            <div>
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

            {/* Basket */}
            <div className="flex items-center gap-3">
                {username && 
                    (<div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-800">{username}</span>
                        <button
                            onClick={handleBasket}
                            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-2xl text-sm shadow transition"
                        >
                            Basket
                        </button>
                    </div>)
                }
                {isAdmin &&
                    (<button
                        onClick={() => navigate("/products/edit")}
                        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                    >
                        🛠️ Create product
                    </button>)
                }
            </div>
        </div>
    );
}

export default SearchBar;
