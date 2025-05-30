import Banner from '../club/Banner/Banner';
import Background from '../course/Background/Background';

import Footer from '../club/Footer/Footer';
import Navbar from '../club/Navbar/Navbar';
import OurServices from '../club/OurServices/OurServices';
import Head from '../course/Head/Head';

const Course = () => {


   return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Head />
        <Banner />
        <OurServices />
        <Footer />
      </div>
    </div>
  );
};

export default Course;