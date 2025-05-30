import { useEffect, useState } from "react";
import apiService from "../../utils/APIService";

const ChooseCourse = ({ onCourseClick }) => {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

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
    "pickleball_elite", "relax_spa"
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const endpoint = searchQuery
          ? `/courses/search?query=${encodeURIComponent(searchQuery)}`
          : "/courses";
        const res = await apiService.getRequest(endpoint);
        if (res.data) {
          setCourses(res.data);
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

  return (
    <div className="relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 shadow-2xl">
        {/* Type filter */}
        <div className="flex flex-wrap gap-2 mb-6 max-h-[180px] overflow-y-auto">
          {courseTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
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

        {/* Search */}
        <div className="mb-10 flex gap-3">
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
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {course.category.replace(/_/g, " ")}
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
      </div>
    </div>
  );
};

export default ChooseCourse;
