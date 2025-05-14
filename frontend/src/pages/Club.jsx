import Banner from '../club/Banner/Banner';
import Footer from '../club/Footer/Footer';
import Head from '../club/Head/Head';
import Navbar from '../club/Navbar/Navbar';
import OurServices from '../club/OurServices/OurServices';
import TopList from '../club/TopList/TopList';



const Club = () => {
  return (
    <div className="app-container ">

    

      
      <Navbar />
      <Head/>
      <TopList />
      <Banner />
      <OurServices />
      <Footer />
      
    </div>
  );
};

export default Club;