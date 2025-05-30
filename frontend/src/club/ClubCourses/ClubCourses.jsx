import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaDoorOpen,
  FaDumbbell,
  FaEuroSign,
  FaMapMarkerAlt,
  FaParking,
  FaUser
} from "react-icons/fa";
import apiService from "../../utils/APIService";

const ClubCourses = ({ clubId, onBack }) => {
  const [courses, setCourses] = useState([]);
  const [clubInfo, setClubInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubRes = await apiService.getRequest(`/clubs/${clubId}`);
        if (clubRes.data) setClubInfo(clubRes.data);

        const coursesRes = await apiService.getRequest(`/courses/by-club/${clubId}`);
        setCourses(coursesRes.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
        setCourses([]);
      }
    };

    fetchData();
  }, [clubId]);

  const getDuration = (start, end) => {
    try {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const minutes = Math.round((endTime - startTime) / 60000);
      return `${minutes} min`;
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        ← Back to Club List
      </button>

      {/* Club Info */}
      {clubInfo && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
            🏋️ Courses for Club:{" "}
            <span className="text-indigo-500">{clubInfo.name}</span>
          </h2>
          <p className="flex items-center justify-center text-gray-700 gap-2">
            <FaMapMarkerAlt className="w-5 h-5 text-rose-500" />
            {clubInfo.address}
          </p>
          <p className="flex items-center justify-center text-gray-700 gap-2">
            <FaParking className="w-5 h-5 text-green-600" />
            Parking Capacity: {clubInfo.parkingCapacity}
          </p>
        </div>
      )}

      {/* Courses */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No course information available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
                <FaDumbbell className="w-5 h-5 text-pink-600" />
                {course.category}
              </h3>

              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaCalendarAlt className="w-5 h-5 text-blue-500" />
                {course.startTime
                  ? new Date(course.startTime).toLocaleString()
                  : "Invalid Date"}
              </p>

              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaClock className="w-5 h-5 text-yellow-500" />
                Duration: {getDuration(course.startTime, course.endTime)}
              </p>

              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaDoorOpen className="w-5 h-5 text-cyan-600" />
                Room Type: {course.room?.type || "Unknown"}
              </p>

              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaUser className="w-5 h-5 text-teal-500" />
                Coach: {course.coach?.username || "Unknown"}
              </p>

              <p className="flex items-center text-green-700 font-bold gap-2">
                <FaEuroSign className="w-5 h-5 text-green-600" />
                {course.price != null ? `${course.price} €` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubCourses;
