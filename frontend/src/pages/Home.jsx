import ChatBot from '../chatBot/chatBot';
import Banner from '../components/Banner/Banner';
import Coach from '../components/Coach/Coach';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Membership from '../components/Membership/Membership';
import Navbar from '../components/Navbar/Navbar';
import OurServices from '../components/OurServices/OurServices';
import TopList from '../components/TopList/TopList';

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1)); 
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50); 
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <ChatBot/>

      {/* Membership Section */}
      <div id="membership">
        <Membership />
      </div>

      {/* Coach Section */}
      <div id="coach">
        <Coach />
      </div>


      {/* Fitness Meals Section */}
      <div id="fitness-meals">
        <TopList />
      </div>

      <Banner />
      <OurServices />
      <Footer />
    </div>
  );
};

export default Home;
