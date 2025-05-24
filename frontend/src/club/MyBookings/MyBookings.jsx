import { useEffect, useState } from "react";
import apiService from "../../utils/APIService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    apiService.getRequest(`/api/bookings/user/${username}`)
      .then(res => setBookings(res.data));
  }, [username]);

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t booked any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h2 className="text-xl font-semibold">{booking.course.title}</h2>
              <p className="text-sm text-gray-600">📍 {booking.course.clubName}</p>
              <p className="text-sm text-gray-600">📅 {booking.course.date}</p>
              <p className="text-sm text-gray-600">💰 {booking.course.price} €</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
