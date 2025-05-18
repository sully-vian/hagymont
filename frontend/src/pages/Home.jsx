import Banner from '../components/Banner/Banner';
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
        const element = document.getElementById(hash.substring(1)); // 移除 '#' 取得 id
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

      {/* Membership Section */}
      <div id="membership">
        <Membership />
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
