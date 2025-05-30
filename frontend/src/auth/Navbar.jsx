import { useEffect, useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/profile.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 
      backdrop-blur-md border-b ${
        scrolled ? "border-gray-700" : "border-transparent"
      } bg-gray-900/95 shadow-xl`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Branding */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/home")}
          >
            <FaDumbbell className="text-2xl text-blue-400 mr-3 transition-transform group-hover:rotate-45" />
            <span className="text-2xl font-bold text-white">
              Ha<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Gym</span>ont
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <ul className="hidden md:flex space-x-6">
              {[
                { name: "Home", path: "/home" },
                { name: "Club", path: "/club" },
                { name: "Courses", path: "/course"  },
                { name: "Shop", path: "/products" }
              ].map((item) => (
                <li
                  key={item.name}
                  className={`px-3 py-2 rounded-md font-medium cursor-pointer transition-colors
                    ${
                      item.path 
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-500 cursor-default"
                    }`}
                  onClick={() => item.path && navigate(item.path)}
                >
                  {item.name}
                </li>
              ))}
            </ul>

            {/* Profile */}
            <div className="flex items-center space-x-2 group relative">
              <img 
                src={Profile} 
                alt="User Profile" 
                className="w-9 h-9 rounded-full border-2 border-blue-400 cursor-pointer hover:border-purple-400 transition-colors"
              />
              <IoIosArrowDown className="text-gray-300 text-lg transition-transform group-hover:rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;