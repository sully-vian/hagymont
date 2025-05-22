import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/gym.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
        {/* text section */}
        <div className="flex flex-col justify-center gap-8 text-center md:text-left pt-24 md:p-0 pb-10">
          <h1 className="text-4xl lg:text-6xl font-semibold">
            A BETTER YOU<br />
            A BETTER WORLD
          </h1>

          <p className="text-lg text-gray-700 animate-fadeIn">
            <span className="text-indigo-600 font-bold">HaGymont</span> is more than just a gym —
            <br />
            it's a sanctuary for <span className="text-red-500 font-semibold">mind</span>,{" "}
            <span className="text-yellow-500 font-semibold">body</span>, and{" "}
            <span className="text-purple-500 font-semibold">soul</span>. Whether you're here to
            enhance your fitness, heal, or pursue a long-lasting wellness journey, we provide
            top-tier facilities and services tailored to your goals.
          </p>

          <div className="flex flex-wrap gap-6 items-center md:justify-start justify-center">
  <button
    className="px-10 py-2 min-w-[300px] text-base font-semibold bg-blue-600 text-white rounded-xl shadow-md hover:scale-105 hover:bg-blue-700 transition duration-200"
    onClick={() => navigate("/signin")}
  >
    JOIN US
  </button>
  <button
    className="px-10 py-2 min-w-[280px] text-base font-semibold bg-green-500 text-black rounded-xl shadow-md hover:scale-105 hover:bg-green-600 transition duration-200"
    onClick={() => navigate("/login")}
  >
    WELCOME BACK
  </button>
</div>


        </div>

        {/* image section */}
        <div className="flex flex-col justify-center">
          <img
            src={HeroImg}
            alt="HaGymont Gym"
            className="animate-spin-slow img-shadow w-[600px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
