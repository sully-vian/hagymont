import { useEffect, useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/profile.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="h-3 lg:h-4" />
      <div
        className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm ${
          scrolled ? "bg-white/30 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaDumbbell className="text-3xl text-primary animate-bounce" />
            <p className="text-3xl lg:text-4xl font-bold text-white">
              Ha
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Gym
              </span>
              ont
            </p>
          </div>

          <div className="flex justify-center items-center gap-10">
            <ul className="flex gap-8 text-base font-medium">
              <li
                className="hover:border-b-2 border-primary uppercase cursor-pointer"
                onClick={() => navigate("/home")}
              >
                Home
              </li>
              <li
                className="hover:border-b-2 border-primary uppercase cursor-pointer"
                onClick={() => navigate("/club")}
              >
                Club
              </li>
              <li className="hover:border-b-2 border-primary uppercase cursor-default">
                Course
              </li>
              <li
                className="hover:border-b-2 border-primary uppercase cursor-pointer"
                onClick={() => navigate("/products")}
              >
                Shop
              </li>
            </ul>

            <div
              className="flex items-center space-x-2 group relative cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <img
                src={Profile}
                alt="User Profile"
                className="w-9 h-9 rounded-full border-2 border-blue-400 hover:border-purple-400 transition-colors"
              />
              <IoIosArrowDown className="text-stone-700 text-lg transition-transform group-hover:rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
