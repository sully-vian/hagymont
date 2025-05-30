import { useEffect, useState } from "react";
import apiService from "../../utils/APIService";

const ChooseCourse = ({ onCourseClick }) => {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortKey, setSortKey] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

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
    cardio_yoga: "🧘‍♀️",
    strength_renforcement: "🏋️",
    yoga_morning: "🌅",
    aqua_fit: "🌊",
    machine_training: "🏋️‍♂️",
    yoga_sunset: "🌇",
    pilates_power: "💪",
    yoga_deep: "🌀",
    boxing_kick: "🥊",
    crossfit_berlin: "🔥",
    relax_spa: "💆",
    pickleball_sport: "🏓",
    golf_elite: "🏌️",
    tennis_pro: "🎾",
    core_burn: "🔥",
    dance_italian_fit: "💃",
    diving_intro: "🤿",
    cycling_advanced: "🚴",
    // 更多类型可继续添加...
  };

  const formatCourseType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getIcon = (type) => categoryIcons[type] || "📘";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const endpoint = searchQuery
          ? `/courses/search?query=${encodeURIComponent(searchQuery)}`
          : "/courses";
        const res = await apiService.getRequest(endpoint);
        if (res.data) {
          setCourses(res.data);
          setCurrentPage(1); // 重置到第1页
        } else {
          throw new Error("No course data returned.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const filteredCourses = selectedType !== "All"
    ? courses.filter((course) => course.category === selectedType)
    : courses;

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortKey === "price") return a.price - b.price;
    if (sortKey === "time") return new Date(a.start_time) - new Date(b.start_time);
    if (sortKey === "capacity") return b.capacity - a.capacity;
    return 0;
  });

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
        {/* 课程类型选择 */}
        <div className="flex flex-wrap gap-2 mb-6 max-h-[180px] overflow-y-auto">
          {courseTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedType === type
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {type.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* 搜索框 + 排序选择 */}
        <div className="mb-10 flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="🔍 Search by coach or type..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Search Courses
          </button>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="px-4 py-3 rounded-full border border-gray-300 text-sm shadow-sm focus:outline-none"
          >
            <option value="default">Sort By</option>
            <option value="price">Price (Low to High)</option>
            <option value="time">Start Time</option>
            <option value="capacity">Capacity (High to Low)</option>
          </select>
        </div>

        {/* 课程卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedCourses.length > 0 ? (
            paginatedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {getIcon(course.category)} {formatCourseType(course.category)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  🕒 {new Date(course.start_time).toLocaleString()} -{" "}
                  {new Date(course.end_time).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  🧑‍🏫 {course.coach_username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  🧍 Capacity: {course.capacity}
                </p>
                <p className="text-sm text-green-600 font-semibold mt-2">
                  💸 ${course.price.toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-300 text-lg">
              {searchQuery || selectedType !== "All"
                ? "😞 No courses found."
                : "📚 Loading courses..."}
            </div>
          )}
        </div>

        {/* 分页按钮 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full text-sm ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseCourse;
