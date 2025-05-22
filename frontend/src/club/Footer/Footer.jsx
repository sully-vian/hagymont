import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
  FaTwitter,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import { useNavigate } from "react-router-dom";
import FooterLogo from "../../assets/x.jpg";

const FooterLinks = [
  { title: "Home", link: "/" },
  { title: "Membership", link: "/#membership" },
  { title: "Coach", link: "/#coach" },
  { title: "Fitness Meals", link: "/#fitness-meals" },
  { title: "Club", link: "/Club" },
  { title: "ChooseClub", link: "../../club/#chooseclub" },
  { title: "Shop", link: "/products" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    if (link.includes("#")) {
      const [path, hash] = link.split("#");
      navigate(path || "/");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(link);
    }
  };

  return (
    <>
      <div className="dark:bg-gray-950 py-10 relative overflow-hidden">


        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 py-5 bg-white/80 backdrop-blur-sm rounded-t-xl px-4 sm:px-10">
            {/* Left - Logo and contact info */}
            <div className="py-8 px-4">
              <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left">
                <img
                  src={FooterLogo}
                  alt="Logo"
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
              </h1>

              <p className="mt-2 text-xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
                  The New Future of Health
              </p>


              <div className="flex items-center gap-3 mt-4">
                <FaLocationArrow />
                <p>Toulouse, France</p>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p>+33 0534322000</p>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-3xl" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-3xl" />
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                  <SiTiktok className="text-3xl" />
                </a>
              </div>
            </div>

            {/* Right - Important Links */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks.map((link) => (
                  <li
                    key={link.title}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200"
                  >
                    <button
                      onClick={() => handleNavigation(link.link)}
                      className="flex items-center space-x-1"
                    >
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center py-5 border-t-2 border-gray-300/50 bg-primary text-white">
            @Made with ❤️ by Team HaGymont
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
