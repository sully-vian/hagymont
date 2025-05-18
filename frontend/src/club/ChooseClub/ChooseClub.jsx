import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../assets/club/club1.png";
import UserService from "../../utils/UserService";


const getClubImage = (id) => {
  try {
    return require(`../../assets/club/club${id}.png`);
  } catch (error) {
    return DefaultImage;
  }
};


const ChooseClub = () => {
  const [clubs, setClubs] = useState([]);
  const [searchInput, setSearchInput] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");  
  const navigate = useNavigate();

  
  useEffect(() => {
  const fetchClubs = async () => {
    try {
      const endpoint = searchQuery 
        ? `/clubs/search?query=${encodeURIComponent(searchQuery)}`
        : "/clubs";
      const res = await UserService.getRequest(endpoint);
      if (res.data) { 
        setClubs(res.data);
      } else {
        throw new Error("No data returned");
      }
    } catch (error) {
      console.error("Failed to load clubs:", error);
      setClubs([]);
    }
  };
  fetchClubs();
}, [searchQuery]);

 
  const handleSearch = () => {
    setSearchQuery(searchInput.trim()); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
    
        <div className="mb-10 flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search by club name or address..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Search Clubs
          </button>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <div
                key={club.id}
                onClick={() => navigate(`/clubs/${club.id}.png`)}
                className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-center"
              >
                <img
  src={getClubImage(club.id)}
  alt={club.name}
  onError={(e) => { e.target.src = DefaultImage }}
  className="w-40 h-40 mx-auto object-cover rounded-full shadow-md border-4 border-white"
/>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {club.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {club.address}
                  </p>
                  {club.parkingCapacity && (
                    <p className="text-sm text-green-600 mt-1">
                      🅿️ {club.parkingCapacity} parking spots
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-300 text-lg">
              {searchQuery ? 
                "😞 No clubs match your search." : 
                "🏋️ Loading clubs..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseClub;