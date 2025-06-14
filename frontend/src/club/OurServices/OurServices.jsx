import { AiOutlineClockCircle } from "react-icons/ai";
import { FaDumbbell, FaMapMarkedAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const OurServices = () => {
  const handleDirectionsClick = () => {
    window.open(
      "https://www.google.com/maps/place/2+Rue+Charles+Camichel,+31000+Toulouse",
      "_blank"
    );
  };

  return (
    <div className="relative z-10 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-10 shadow-xl">
        {/* header section */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">Contact Us</h1>
        </div>

        {/* info section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mt-12 text-center text-gray-900 dark:text-gray-100">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <FaDumbbell className="text-4xl text-indigo-600 mb-2" />
            <p className="text-xl font-bold">HaGymont</p>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <MdLocationOn className="text-2xl text-indigo-600 mb-2" />
            <p className="text-md font-semibold leading-6">
              2 Rue Charles Camichel<br />
              31000 Toulouse<br />
            </p>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <AiOutlineClockCircle className="text-2xl text-indigo-600 mb-2" />
            <p className="text-md font-semibold leading-6">
              <span className="font-bold">Club Hours</span><br />
              Mon–Fri: 6am – 10pm<br />
              Sat + Sun: 7am – 9pm<br />
              <em className="text-sm text-gray-700 dark:text-gray-300">*Holiday hours may vary.</em>
            </p>
          </div>

          {/* Directions Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleDirectionsClick}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              <FaMapMarkedAlt className="text-xl" />
              Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
