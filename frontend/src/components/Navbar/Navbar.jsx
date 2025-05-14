import { FaDumbbell } from "react-icons/fa"; // 👈 新图标
import { IoIosArrowDown } from "react-icons/io";
import Profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleShop = () => {
    navigate('/products');
  }

  const handleHome = () => {
    navigate('/home');
  }
  return (
    <div className="py-4 lg:py-6">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaDumbbell className="text-3xl text-primary animate-bounce" />
          <p className="text-3xl lg:text-4xl font-semibold">
            Ha<span className="text-primary">Gym</span>ont
            </p>
            </div>


        {/* Menu section */}
        <div className="flex justify-center items-center gap-10">
          <ul className="flex gap-8">
            <li className="hover:border-b-2 border-primary uppercase cursor-default"
                onClick={() => {handleHome()}}>Home</li>
            <li className="hover:border-b-2 border-primary uppercase cursor-default">Prices</li>
            <li className="hover:border-b-2 border-primary uppercase cursor-default">About</li>
            <li className="hover:border-b-2 border-primary uppercase cursor-default"
                onClick={() => {handleShop()}}>Shop</li>
          </ul>
          {/* login section */}
          <div className="flex gap-4 items-center">
            <img src={Profile} alt="Profile" className="w-10 rounded-full" />
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
