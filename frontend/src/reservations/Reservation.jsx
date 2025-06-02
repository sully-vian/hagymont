import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

import { enUS } from 'date-fns/locale';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import SessionService from '../utils/SessionService';
import apiService from '../utils/APIService';

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

function CustomAgendaEvent({ event }) {
  return (
    <div className={`p-3 mb-2 rounded-md ${event.status==="confirmed" ? "bg-blue-600" : "bg-gray-400"} text-white shadow-md`}>
      <span className="font-semibold">
        {format(event.start, 'dd/MM/yyyy')} : {format(event.start, 'HH:mm')}-{format(event.end, 'HH:mm')}  ❯ {"  "}
      </span>
      <span>{event.title}</span>
    </div>
  );
}

function CustomMonthEvent({ event }) {
  const bgColor = event.status === 'confirmed'? 'bg-blue-600': 'bg-gray-400';

  return (
    <div className={`p-1.5 rounded-md ${bgColor} text-white shadow-sm`}>
      <div className="text-xs font-semibold">
        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
      </div>
      <div className="text-sm break-words whitespace-normal overflow-hidden w-full">{event.title}</div>
    </div>
  );
}

function Reservation() {
  const [view, setView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const username = SessionService.getUsername();

  useEffect(() => {
      if (!username) {
        navigate('/login');
        return;
      }
      apiService.getRequest(`/reservations/user/${username}`)
      .then(response => {
        const rawReservations = response.data;
        setCourses(rawReservations.map(res => ({
          title: formatTitle(res.course.category),
          start: new Date(res.course.startTime),
          end: new Date(res.course.endTime),
          status: res.status,
          course: res.course,
        })))
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erreur détectée :', error);
        navigate('/error', {"state":error.status});
      });
    }, []); 

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div>
      <Navbar/>
      <div className="relative mt-6 max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl w-full">
        <div className = "mb-5 flex justify-center font-extrabold text-5xl text-purple-700 ">
            <p>YOUR COURSES</p>
        </div>
        <div className="mb-4 flex justify-center space-x-4">
          <button
            onClick={() => setView(Views.MONTH)}
            className={`px-4 py-2 rounded ${
              view === Views.MONTH ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView(Views.AGENDA)}
            className={`px-4 py-2 rounded ${
              view === Views.AGENDA ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            Agenda
          </button>
        </div>

        {/* Boutons de navigation du mois */}
        
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
        

        <div className="bg-gray-100 rounded-xl shadow-md p-4 font-sans font-bold">
          <Calendar
            localizer={localizer}
            events={courses}
            messages={{
              event: 'My reservations',
            }}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            views={[Views.MONTH, Views.AGENDA]} 
            view={view}
            date={currentDate} 
            onNavigate={setCurrentDate}
            components={{
              agenda: {
                event: CustomAgendaEvent,
              },
              month: {
                event:CustomMonthEvent,
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reservation;
