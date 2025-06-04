import Footer from '../club/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import OurServices from '../club/OurServices/OurServices';
import Background from '../course/Background/Background';
import Banner from '../course/Banner/Banner';
import ChooseCourse from '../course/ChooseCourse/ChooseCourse';
import Head from '../course/Head/Head';
import ChatBot from '../chatBot/chatBot';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const navigate = useNavigate();

  const onCourseClick = (courseId) => {
    navigate(`/reservation/${courseId}`);
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
        <div id="course">
        <Banner />
        </div>
        <div id="contact">
        <OurServices />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Course;