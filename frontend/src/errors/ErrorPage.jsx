import { useLocation, useNavigate } from 'react-router-dom';
import background from '../assets/salle.jpg';
import { useState } from 'react';

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const status = location.state;

  let message;

  if (status === 404) {
    message = "Oops! This page didn’t hit the target.";
  } else if (status >= 500) {
    message = "Something broke during the workout. Our server needs a spotter.";
  } else {
    message = "Unexpected detour. Time to get back on track.";
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-6 rounded-xl text-center text-white max-w-lg w-full"
       style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <h1 className="text-4xl font-extrabold text-white mb-8 p-6">{message}</h1>
        <div className="flex justify-center gap-6 mt-4 p-6">
          {!(status >= 500) && (
            <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white w-40 py-2 rounded-full hover:bg-gray-900 shadow-md uppercase tracking-wider p-6"
          >
            Back
          </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white w-40 py-2 rounded-full hover:bg-red-700 shadow-md uppercase tracking-wider p-6"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
