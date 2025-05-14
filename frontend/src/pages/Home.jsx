import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Membership from '../components/Membership/Membership';
import Navbar from '../components/Navbar/Navbar';
import OurServices from '../components/OurServices/OurServices';
import TopList from '../components/TopList/TopList';


const Home = () => {
  return (
    <div className="app-container"> 
      <Navbar />
      <Hero />
      <Membership/>
      <TopList />
      <Banner />
      <OurServices />
      <Footer />

    </div>
  );
};

export default Home;