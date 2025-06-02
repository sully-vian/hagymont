import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ItemBar, Logo} from "./components/Components";
import SessionService from "../../utils/SessionService";
import UserLogo from "./components/UserLogo";

const Navbar = () => {
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
          <Logo/>
          <div className="flex justify-center items-center gap-10">
            <ul className="flex gap-8">
              <ItemBar
                label="Home"
                page="/home"
              />
              <ItemBar
                label="Club"
                page="/club"
              />
              <ItemBar
                label="Course"
                page="/course"
              />
              <ItemBar
                label="shop"
                page="/products"
              />
            </ul>
            <UserLogo 
            theme={{
              arrowColor : "text-stone-500",
              bgColor : "bg-white",
              borderColor : "border-gray-200",
              buttonColor : "text-blue-500",
              buttonColorHover : "hover:text-purple-600",
              textColor : "text-gray-800"
            }}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
