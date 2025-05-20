// Navbar.jsx
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
    <div
      className={`sticky top-0 z-50 transition-shadow duration-300 bg-white/70 backdrop-blur ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex justify-between items-center px-4 py-4 lg:py-6">
        <div className="flex items-center gap-2">
          <FaDumbbell className="text-3xl text-primary animate-bounce" />
          <p className="text-3xl lg:text-4xl font-semibold">
            Ha<span className="text-primary">Gym</span>ont
          </p>
        </div>

        <div className="flex justify-center items-center gap-10">
          <ul className="flex gap-8">
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

          <div className="flex gap-4 items-center">
            <img src={Profile} alt="Profile" className="w-10 rounded-full" 
            onClick={() => navigate("/profile")} />
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
