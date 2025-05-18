import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../utils/UserService";

const ChooseCourse = () => {
  const { clubId } = useParams();
  const [courses, setCourses] = useState([]);
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    UserService.getRequest(`/api/clubs/${clubId}/courses`)
      .then(res => setCourses(res.data));
    UserService.getRequest(`/api/clubs/${clubId}`)
      .then(res => setClubName(res.data.name));
  }, [clubId]);

  const handleBooking = (courseId) => {
    const username = sessionStorage.getItem("username");
    UserService.postRequest(`/api/bookings/${username}`, {
      courseId
    })
    .then(() => alert("Booking successful!"))
    .catch(err => alert("Booking failed."));
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">{clubName} - Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mt-1">{course.description}</p>
            <p className="mt-2 text-sm text-gray-500">📅 {course.date}</p>
            <p className="mt-1 text-sm text-gray-500">💰 {course.price} €</p>
            <button
              onClick={() => handleBooking(course.id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCourse;
