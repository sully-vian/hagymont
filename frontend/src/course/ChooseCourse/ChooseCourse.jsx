import { useEffect, useState } from "react";
import apiService from "../../utils/APIService";

const ChooseCourse = ({ onCourseClick }) => {
  // State management
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortKey, setSortKey] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const getLevel = (course) => {
    const keywords = ["advanced", "pro", "elite", "focus", "deep"];
    const lower = course.category.toLowerCase();
    return keywords.some(k => lower.includes(k)) ? "Advanced" : "Beginner";
  };

  const itemsPerPage = 6;

  // List of course types
  const courseTypes = [
    "All",
    "cardio_yoga", "strength_renforcement", "yoga_morning", "aqua_fit",
    "machine_training", "yoga_sunset", "pilates_power", "yoga_deep",
    "machine_tone", "boxing_kick", "core_burn", "yoga_sun", "diving_intro",
    "machine_strength", "cardio_cycle", "cardio_burn", "pilates_milan",
    "dance_italian_fit", "machine_sculpt", "crossfit_berlin", "machine_core",
    "pickleball_sport", "cardio_royal", "machine_focus", "cardio_sunrise",
    "yoga_wave", "machine_weight", "tennis_pro", "golf_elite",
    "pilates_private", "yoga_beach", "aqua_training", "core_paddle",
    "pickleball_elite", "relax_spa", "cycling_advanced", "crossfit_pro",
  ];

  const categoryIcons = {
    cardio_yoga: "🤸‍♂️",
    strength_renforcement: "🏋️‍♂️",
    yoga_morning: "🌅",
    aqua_fit: "🏊‍♂️",
    machine_training: "🏋️",
    yoga_sunset: "🌇",
    yoga_sun: "☀️",
    cardio_sunrise: "🌄",
    pilates_power: "🧘‍♂️",
    yoga_deep: "🧘‍♀️",
    boxing_kick: "🥊",
    crossfit_berlin: "💪",
    relax_spa: "🛀",
    pickleball_sport: "🏓",
    golf_elite: "⛳",
    tennis_pro: "🎾",
    core_burn: "🔥",
    machine_strength: "🏋️‍♀️",
    dance_italian_fit: "💃",
    diving_intro: "🤿",
    cycling_advanced: "🚴‍♂️",
    cardio_cycle: "🚲",
    cardio_burn: "💥",
    pilates_milan: "🧘",
    machine_tone: "🏋️‍♂️",
    machine_sculpt: "🛠️",
    machine_core: "⚙️",
    machine_focus: "🎯",
    strength_reinforcement: "🏋️",
    cardio_royal: "👑",
    yoga_wave: "🌊",
    machine_weight: "🏋️",
    pilates_private: "🔒",
    yoga_beach: "🏖️",
    aqua_training: "🏊‍♀️",
    core_paddle: "🛶",
    pickleball_elite: "🏓",
    crossfit_pro: "🏆",
    tennis_pro_alt: "🎾",
    golf_elite_alt: "⛳",
    cycling_advanced_alt: "🚴‍♂️",
  };
  const getIcon = (type) => {
    if (type === "tennis_pro") return "🎾";
    if (type === "golf_elite") return "🏌️";
    if (type === "cycling_advanced") return "🚴";
    return categoryIcons[type] || ""; 
  };

  const printDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const printTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}); 
  };

  const formatCourseType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const endpoint = searchQuery
      ? `/courses/search?query=${encodeURIComponent(searchQuery)}`
      : "/courses";
    apiService.getRequest(endpoint)
    .then(res => {
      setCourses(res.data);
      setCurrentPage(1);
    })
    .catch(error => {
      console.error("Error fetching courses:", error);
      setCourses([]);
    });
  }, [searchQuery]);

  // Search handler
  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Filtering and sorting
  const filteredCourses = selectedType !== "All"
    ? courses.filter((course) => course.category.toLowerCase() === selectedType)
    : courses;

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortKey === "price") return a.price - b.price;
    if (sortKey === "time") return new Date(a.start_time) - new Date(b.start_time);
    if (sortKey === "capacity") return b.capacity - a.capacity;
    return 0;
  });

  // Pagination handling
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl  font-extrabold  text-purple-600 to-indigo-600 mb-4 drop-shadow-sm">
            🌞Find Your Perfect Workout🌞
          </h1>
         <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the perfect fitness classes tailored for you,<br/> guided by professional instructors with flexible schedules
          </p>
        </div>

        {/* Course Type Filter */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4 tracking-wider uppercase">
            🎯 Choose Your Style
          </h3>

          <div className="flex flex-wrap gap-3 max-h-[180px] overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            {courseTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
                  selectedType === type
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-300/30 hover:shadow-purple-300/50 transform hover:scale-105"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {getIcon(type)} {type.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Sort */}
        <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="🔍 Search for instructors or course types..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white dark:bg-gray-700 transition-all duration-300"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa fa-search"></i>
              </div>
            </div>
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <i className="fa fa-filter"></i>
              Search Courses
            </button>
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="appearance-none w-full px-4 py-3 pr-10 rounded-lg border border--300 text-gray-800 bg-gray-200 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 cursor-pointer"
              >
                <option value="default" disabled className="text-gray-600">
                  Sort By
                </option>
                <option value="price">Price (Low to High)</option>
                <option value="time">Start Time</option>
                <option value="capacity">Capacity (High to Low)</option>
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                <i className="fa fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="h-40 bg-gradient-to-r from-purple-400 to-indigo-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      {getIcon(course.category) && (
                        <div className="text-3xl mb-2 animate-bounce">
                          {getIcon(course.category)}
                        </div>
                      )}
                      <h3 className="text-[clamp(1rem,2vw,1.3rem)] font-bold text-white shadow-md px-2 py-1 bg-purple-800/70 rounded-xl inline-block tracking-wide uppercase backdrop-blur-sm">
                        {formatCourseType(course.category)}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    <div className="bg-white/90 dark:bg-gray-700/90 text-purple-600 dark:text-white rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {getLevel(course)}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        📅 {printDate(course.startTime)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        🕒 {printTime(course.startTime)} -{" "}
                        {printTime(course.endTime)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">🧑‍🏫 {course.coachUsername}</p>
                      <p className="text-sm text-gray-500">🧍 {course.capacity} spots</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-green-600 dark:text-green-400 font-bold">
                      ${course.price.toFixed(2)}
                    </div>
                    <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors duration-300 text-sm flex items-center gap-1">
                      View Details <i className="fa fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <i className="fa fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                {searchQuery || selectedType !== "All"
                  ? "No matching courses found"
                  : "Loading courses..."}
              </h3>
              <p className="text-gray-400 dark:text-gray-500 max-w-md">
                {searchQuery || selectedType !== "All"
                  ? "Please try adjusting your search criteria or selecting another category"
                  : "Please wait while we fetch the latest course information"}
              </p>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={`px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              
              {Math.max(1, currentPage - 2) <= Math.min(totalPages, currentPage + 2) &&
                Array.from({ length: Math.min(totalPages, currentPage + 2) - Math.max(1, currentPage - 2) + 1 }, (_, i) => {
                  const page = Math.max(1, currentPage - 2) + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border-t border-b border-gray-300 dark:border-gray-700 ${
                        currentPage === page 
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      } transition-colors duration-300`}
                    >
                      {page}
                    </button>
                  );
                })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={`px-4 py-2 rounded-r-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === totalPages}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseCourse;    
