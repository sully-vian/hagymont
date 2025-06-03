import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import subMonths from 'date-fns/subMonths';
import { useEffect, useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import ConfirmCard from '../components/ConfirmCard'

import { enUS } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import apiService from '../utils/APIService';
import SessionService from '../utils/SessionService';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const formatTitle = (type) => {
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white shadow-md z-50 ${
    type === "success" ? "bg-green-600" : "bg-red-500"
  }`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function isCancelable(startTime) {
  const now = new Date();
  const start = new Date(startTime);
  const diffHours = (start - now) / (1000 * 60 * 60);
  return diffHours >= 24;
}

function CancelButton({ reservationId, startTime }) {
  const cancelable = isCancelable(startTime);
  const [showConfirm, setShowCorfirm] = useState(false);

  const handleTryDelete = () => {
    if (!cancelable) {
      showToast("Cannot cancel within 24 hours of course start time", "error");
      return;
    }
    setShowCorfirm(true)
  }

  const handleCancel = () => {
    apiService.deleteRequest(`/reservations/${reservationId}`)
      .then(() => {
        showToast("Reservation cancelled successfully");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(err => {
        console.error(err);
        showToast("Failed to cancel: " + err.message, "error");
      });
  };

  return (
    <div>
      <button
        onClick={handleTryDelete}
        className={`ml-4 px-2 py-1 text-xs rounded ${
          cancelable
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!cancelable}
      >
        Cancel
      </button>
      {showConfirm && <ConfirmCard
        message = "Are you sure you want to cancel ?"
        onConfirm = {handleCancel}
        onCancel = {() => setShowCorfirm(false)}
        confirmLabel = "Yes, I'm sure"
        cancelLabel = "Actually no" 
      />}
    </div>
    
  );
}

function CustomAgendaEvent({ event }) {
  if (!event || !event.start || !event.end) {
    return <div className="text-red-600">Invalid reservation event</div>;
  }

  return (
    <div className={`p-3 mb-2 rounded-md ${event.status === "confirmed" ? "bg-blue-600" : "bg-gray-400"} text-white shadow-md`}>
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          {format(event.start, 'dd/MM/yyyy')} : {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')} ❯
        </span>
        {event.reservationId && <CancelButton reservationId={event.reservationId} startTime={event.start} />}
      </div>
      <span>{event.title}</span>
    </div>
  );
}

function CustomMonthEvent({ event }) {
  const bgColor = event.status === 'confirmed' ? 'bg-blue-600' : 'bg-gray-400';

  return (
    <div className={`p-1.5 rounded-md ${bgColor} text-white shadow-sm`}>
      <div className="text-xs font-semibold">
        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
      </div>
      <div className="text-sm break-words whitespace-normal overflow-hidden w-full">{event.title}</div>
      {event.reservationId && <CancelButton reservationId={event.reservationId} startTime={event.start} />}
    </div>
  );
}

function Reservation() {
  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rawReservations, setRawReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const username = SessionService.getUsername();

  const parseDate = (dateString) => {
    try {
      return dateString ? new Date(dateString) : new Date();
    } catch (e) {
      console.error('Invalid date:', dateString);
      return new Date();
    }
  };

  const courses = useMemo(() => {
    return rawReservations
      .filter(res => res && res.course && res.course.startTime && res.course.endTime)
      .map(res => ({
        title: formatTitle(res.course.category),
        start: parseDate(res.course.startTime),
        end: parseDate(res.course.endTime),
        status: res.status,
        course: res.course,
        reservationId: res.id,
      }));
  }, [rawReservations]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!username) {
      navigate('/login');
      return;
    }

    apiService.getRequest(`/reservations/user/${username}`)
      .then(response => {
        setRawReservations(response.data || []);
      })
      .catch(err => {
        console.error('Error fetching reservations:', err);
        setError(err.message || 'Failed to load reservations');
        navigate('/error', { state: err.status || 500 });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, username]);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="relative mt-6 max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl w-full shadow-xl overflow-hidden">
        <div className="mb-5 flex justify-center font-extrabold text-5xl text-purple-700 pt-6">
          <p>YOUR COURSES</p>
        </div>

        <div className="mb-4 flex justify-center space-x-4">
          <button
            onClick={() => setView(Views.MONTH)}
            className={`px-4 py-2 rounded ${view === Views.MONTH ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView(Views.AGENDA)}
            className={`px-4 py-2 rounded ${view === Views.AGENDA ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Agenda
          </button>
        </div>

        <div className="mb-3 flex justify-center space-x-8 items-center text-md font-semibold">
          <button
            onClick={prevMonth}
            className="px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            ❮ Previous
          </button>
          <span className="text-4xl font-extrabold text-gray-500">{format(currentDate, 'MMMM yyyy')}</span>
          <button
            onClick={nextMonth}
            className="px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Next ❯
          </button>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-4 font-sans font-bold mb-6">
          <Calendar
            localizer={localizer}
            events={courses}
            messages={{ event: 'My reservations' }}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            views={[Views.MONTH, Views.AGENDA]}
            view={view}
            date={currentDate}
            onNavigate={setCurrentDate}
            components={{
              agenda: { event: CustomAgendaEvent },
              month: { event: CustomMonthEvent },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reservation;
