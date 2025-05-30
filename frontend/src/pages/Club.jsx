import { useState } from 'react';
import Background from '../club/Background/Background';
import Banner from '../club/Banner/Banner';
import ChooseClub from '../club/ChooseClub/ChooseClub';
import ClubCourses from '../club/ClubCourses/ClubCourses';
import Footer from '../club/Footer/Footer';
import Head from '../club/Head/Head';
import Navbar from '../club/Navbar/Navbar';
import OurServices from '../club/OurServices/OurServices';

const Club = () => {
  const [selectedClubId, setSelectedClubId] = useState(null);

    const handleClubClick = (clubId) => {
    // If the clicked club is already selected, unselect it (hide courses)
    if (selectedClubId === clubId) {
      setSelectedClubId(null);
    } else {
      setSelectedClubId(clubId);
    }
  };

   return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <Navbar />
        <Head />

        <div id="chooseclub">
          <ChooseClub onClubClick={handleClubClick} />
        </div>

        {selectedClubId && (
          <div className="mt-10 px-4">
            <ClubCourses
              clubId={selectedClubId}
              onBack={() => setSelectedClubId(null)} // Back to club list
            />
          </div>
        )}

        <Banner />
        <OurServices />
        <Footer />
      </div>
    </div>
  );
};

export default Club;