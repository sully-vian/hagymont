import Background from '../club/Background/Background';
import Banner from '../club/Banner/Banner';
import ChooseClub from '../club/ChooseClub/ChooseClub';
import Footer from '../club/Footer/Footer';
import Head from '../club/Head/Head';
import Navbar from '../club/Navbar/Navbar';
import OurServices from '../club/OurServices/OurServices';

const Club = () => {
  return (
    <div className="relative min-h-screen">
      <Background />


      <div className="relative z-10">
        <Navbar/>
        <Head />
        <ChooseClub />
        <Banner />
        <OurServices />
        <Footer />
      </div>
    </div>
  );
};

export default Club;
