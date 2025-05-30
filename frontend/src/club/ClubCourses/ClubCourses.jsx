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

  // Format course type for display
  const formatCourseType = (type) => {
    if (!type) return "Unknown";
    return type
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get club info
      const clubRes = await apiService.getRequest(`/clubs/${clubId}`);
      if (clubRes.data) setClubInfo(clubRes.data);

        // Get courses for the club
      const coursesRes = await apiService.getRequest(`/courses/by-club/${clubId}`);
      console.log("Courses data:", coursesRes.data);

        
        const processedCourses = (coursesRes.data || []).map(course => ({
          ...course,
          startTime: course.start_time || course.startTime,
          endTime: course.end_time || course.endTime,
          coachUsername: course.coach_username || course.coachUsername,
          roomType: course.room?.type || course.room_type || "Unknown"
        }));
        
        setCourses(processedCourses);
      } catch (error) {
        console.error("Error loading data:", error);
        setCourses([]);
      }
    };

    fetchData();
  }, [clubId]);

  // Calculate course duration
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

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleString('en-GB', options);
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        ← Back to Club List
      </button>

      {/* Club info */}
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
          {clubInfo.parkingCapacity && (
            <p className="flex items-center justify-center text-gray-700 gap-2">
              <FaParking className="w-5 h-5 text-green-600" />
              Parking Capacity: {clubInfo.parkingCapacity}
            </p>
          )}
        </div>
      )}

      {/* Course list */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No course information available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              {/* Course type (formatted) */}
              <h3 className="text-xl font-bold text-purple-600 mb-3 flex items-center gap-2">
                <FaDumbbell className="w-5 h-5 text-pink-600" />
                {formatCourseType(course.category)}
              </h3>

              {/* Course date */}
              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaCalendarAlt className="w-5 h-5 text-blue-500" />
                {formatDate(course.startTime)}
              </p>

              {/* Course duration */}
              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaClock className="w-5 h-5 text-yellow-500" />
                Duration: {getDuration(course.startTime, course.endTime)}
              </p>

              {/* Room type */}
              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaDoorOpen className="w-5 h-5 text-cyan-600" />
                Room Type: {formatCourseType(course.roomType)}
              </p>

              {/* Coach info */}
              <p className="flex items-center text-gray-700 mb-1 gap-2">
                <FaUser className="w-5 h-5 text-teal-500" />
                Coach: {course.coachUsername || "Unknown"}
              </p>

              {/* Price */}
              <p className="flex items-center text-green-700 font-bold gap-2">
                <FaEuroSign className="w-5 h-5 text-green-600" />
                {course.price != null ? `${course.price.toFixed(2)} €` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubCourses;