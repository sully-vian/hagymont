import React, { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDumbbell,
  FaEuroSign,
  FaMapMarkerAlt,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultImage from '../../assets/course/course1.jpg';
import Navbar from '../../club/Navbar/Navbar';
import apiService from '../../utils/APIService';
import SessionService from '../../utils/SessionService';
import Background from '../Background/Background';

const getCourseImage = (id) => {
  try {
    return require(`../../assets/course/course${id}.jpg`);
  } catch (error) {
    return DefaultImage;
  }
};

function Reserve() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const navigate = useNavigate();
  const username = SessionService.getUsername();
  const isCoach = SessionService.getRole() === 'coach';

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiService.getRequest(`/courses/${courseId}`);
        if (!response.data) throw new Error('Course not found');
        setCourse(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleReserve = async () => {
    if (!username) {
      navigate("/login");
      return;
    }
    if (!course) return;
    try {
      const reservationDto = {
        user: username,
        status: 'confirmed',
        course: { id: course.id },
      };
      const response = await apiService.postRequest(`/reservations`, reservationDto);

      if (response.data && response.data.id) {
        setReservationSuccess(true);
        setCourse((prevCourse) => ({
          ...prevCourse,
          capacity: prevCourse.capacity - 1,
        }));
      } else {
        throw new Error('Reservation failed');
      }
    } catch (err) {
      setError(err.message || 'Failed to reserve course');
    }
  };

  const handleRedirect = () => {
    navigate('/calendar');
  };

  // 修改 handleEditCourse 函数，添加日志
const handleEditCourse = () => {
  console.log("Passing course data:", course); // 确认数据存在
  navigate("/course/edit", { 
    state: { 
      course: {
        ...course,
        place: course.place || { id: null } // 确保 place 不为 undefined
      }
    }
  });
};

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} navigate={navigate} />;
  if (!course) return <NotFoundComponent />;

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="absolute inset-0 z-[-1]">
        <Background />
      </div>
      <div className="relative z-10 pt-[64px] pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={getCourseImage(course.id)}
              alt="Course"
              onError={(e) => {
                e.target.src = DefaultImage;
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center mb-4">
              <FaDumbbell className="text-pink-600 text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-indigo-700">
                {course.category
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h1>
            </div>

            <div className="mb-8">
              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                <FaUsers className="text-green-600 text-2xl mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Remaining Capacity</p>
                  <p
                    className={`text-2xl font-bold ${
                      course.capacity > 3 ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {course.capacity || 0} spot{course.capacity === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <DateSection icon={FaCalendarAlt} label="Date & Time" value={course.startTime} />
              <DurationSection start={course.startTime} end={course.endTime} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CoachSection coach={course.coachUsername} />
              <LocationSection place={course.place} />
            </div>

            <PriceSection price={course.price} />

            {reservationSuccess && (
              <div>
                <SuccessMessage />
                <div className="text-center mt-6">
                  <button
                    onClick={handleRedirect}
                    className="w-full px-8 py-3 bg-green-700 text-white font-bold rounded-lg shadow-md hover:bg-green-800 transition duration-300"
                  >
                    View My Reservations
                  </button>
                </div>
              </div>
            )}

            <div className="text-center mt-8">
              {isCoach && username === course.coachUsername ? (
                <button
                  onClick={handleEditCourse}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                  Modify course
                </button>
              ) : (
                <button
                  onClick={handleReserve}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={reservationSuccess || course.capacity === 0}
                >
                  {reservationSuccess ? 'Reservation Confirmed' : 'Reserve This Course'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const DateSection = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    {React.createElement(icon, { className: 'text-blue-500 text-xl mr-3' })}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium">
        {new Date(value).toLocaleString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  </div>
);

const DurationSection = ({ start, end }) => {
  const duration = Math.round((new Date(end) - new Date(start)) / 60000);
  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
      <FaClock className="text-yellow-500 text-xl mr-3" />
      <div>
        <p className="text-sm text-gray-500">Duration</p>
        <p className="text-lg font-medium">{duration} minutes</p>
      </div>
    </div>
  );
};

const CoachSection = ({ coach }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <FaUser className="text-green-500 text-xl mr-3" />
    <div>
      <p className="text-sm text-gray-500">Coach</p>
      <p className="text-lg font-medium">{coach || 'Unknown'}</p>
    </div>
  </div>
);

const LocationSection = ({ place }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <FaMapMarkerAlt className="text-red-500 text-xl mr-3" />
    <div>
      <p className="text-sm text-gray-500">Location</p>
      <p className="text-lg font-medium">{place?.club || 'Unknown Club'}</p>
      <p className="text-sm text-gray-600">{place?.address || 'Unknown Address'}</p>
    </div>
  </div>
);

const PriceSection = ({ price }) => (
  <div className="flex items-center p-4 bg-blue-50 rounded-lg mb-8">
    <FaEuroSign className="text-blue-600 text-xl mr-3" />
    <div>
      <p className="text-sm text-gray-500">Price</p>
      <p className="text-xl font-bold text-blue-600">{price?.toFixed(2)} €</p>
    </div>
  </div>
);

const SuccessMessage = () => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <FaCheckCircle className="text-green-500 text-xl mr-2" />
      <div>
        <h3 className="font-medium text-green-800">Reservation Successful!</h3>
        <p className="text-sm text-green-700">Your reservation has been confirmed.</p>
      </div>
    </div>
  </div>
);

const LoadingComponent = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-300 border-t-blue-600"></div>
  </div>
);

const ErrorComponent = ({ error, navigate }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-700 mb-6">{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Go Back to Previous Page
      </button>
    </div>
  </div>
);

const NotFoundComponent = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <p className="text-xl text-gray-500">The course you are looking for could not be found.</p>
  </div>
);

export default Reserve;

