import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { enUS } from 'date-fns/locale';

// Configuration du localizer pour date-fns
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Cours Yoga',
    start: new Date(),
    end: new Date(),
  },
];

function Reservation() {
  return (
    <div className="relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-purple-600 to-indigo-600 mb-4 drop-shadow-sm">
            📅 Réservez votre créneau
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Choisissez une date et une heure pour votre réservation
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-4">
          <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reservation;
