import Banner from '../club/Banner/Banner';
import Footer from '../club/Footer/Footer';
import Navbar from '../club/Navbar/Navbar';
import OurServices from '../club/OurServices/OurServices';
import Background from '../course/Background/Background';
import ChooseCourse from '../course/ChooseCourse/ChooseCourse';
import Head from '../course/Head/Head';

const Course = () => {

  const onCourseClick = (e) => {
    //TODO aller sur page reservation cours
  }


   return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Head />
        <div id="choosecourse">
          <ChooseCourse onCourseClick={onCourseClick} />
        </div>
        <Banner />
        <OurServices />
        <Footer />
      </div>
    </div>
  );
};

export default Course;