import { useState } from "react";
import PickleballImg from "../../assets/course/pickleball.jpeg";
import SurfingImg from "../../assets/course/surfing.jpg";
import SpaImg from "../../assets/spa.jpeg";


const Banner = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container py-14">
      <div className="max-w-7xl mx-auto bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-10 shadow-xl overflow-hidden relative">
        {/* decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-500/10 to-transparent -z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* left part photoes */}
<div className="lg:col-span-1 flex flex-col gap-6">
  {/* Spa */}
  <div className="relative group">
    <img
      src={SpaImg}
      alt="Spa Relaxation"
      className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl flex items-end p-6">
      <p className="text-white font-bold text-lg">Luxury Spa & Recovery Zone</p>
    </div>
  </div>

  {/* Surfing */}
  <div className="relative group">
    <img
      src={SurfingImg}
      alt="Surfing Course"
      className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl flex items-end p-6">
      <p className="text-white font-bold text-lg">Underwater Surfing Experience</p>
    </div>
  </div>

  {/* Pickleball */}
  <div className="relative group">
    <img
      src={PickleballImg}
      alt="Pickleball Class"
      className="w-full h-auto rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl flex items-end p-6">
      <p className="text-white font-bold text-lg">Fun & Fast Pickleball Courts</p>
    </div>
  </div>
</div>

          {/* right part  */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h1 className="text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold leading-tight mb-6">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-yellow-400 to-red-400">
    HaGymont Fitness Club
  </span>
  <br />
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
    Offering <span className="text-red-600 font-bold">50+</span> Expert-Led Courses for All Levels
  </span>
</h1>

<p className="text-lg font-semibold text-gray-900 dark:text-gray-200 leading-relaxed mb-8">
  At Ha<span className="text-blue-600 font-bold">Gym</span>ont, we provide a diverse range of fitness programs — from <span className="text-green-600 font-bold">Cardio</span> to <span className="text-rose-400 font-bold">Yoga</span>, <span className="text-purple-600 font-bold">Pilates</span> to <span className="text-red-600 font-bold">CrossFit</span>.  
  Plus, explore specialty courses like <span className="text-teal-600 font-bold">Diving</span>, <span className="text-blue-400 font-bold">Surfing</span>, <span className="text-pink-600 font-bold">Spa treatments</span>, <span className="text-yellow-600 font-bold">Tennis</span>, and <span className="text-indigo-600 font-bold">Pickleball</span>.  
  We also offer <span className="text-orange-500 font-bold">Personal Training</span> sessions tailored to your individual goals.  
  <br/>Our expert trainers customize every class to empower your fitness journey, whether you're just starting or looking to level up.  
  <br/>Join Ha<span className="text-blue-600 font-bold">Gym</span>ont and <strong>transform your wellness with vibrant, world-class courses.</strong>
</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: "fa-users",
                  title: "Expert Trainers",
                  description:
                    "Certified professionals guiding your personalized fitness path.",
                  color: "from-green-400 to-teal-400",
                },
                {
                  icon: "fa-dumbbell",
                  title: "Diverse Classes",
                  description:
                    "Over 50 specialized courses from cardio to strength training.",
                  color: "from-blue-400 to-indigo-400",
                },
                {
                  icon: "fa-clock-o",
                  title: "Flexible Schedule",
                  description:
                    "Classes all day, every day — fit your workout seamlessly.",
                  color: "from-purple-400 to-pink-400",
                },
                {
                  icon: "fa-star",
                  title: "Premium Facilities",
                  description:
                    "Modern gyms and relaxing spa amenities to enhance your wellness.",
                  color: "from-orange-400 to-red-400",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg 
                              ${
                                expandedCard === index
                                  ? "scale-105 z-10 col-span-full"
                                  : "hover:scale-[1.02]"
                              } 
                              transition-transform duration-300 cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <i className={`fa ${card.icon} text-white text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {expandedCard === index
                          ? card.description +
                            " Our expert trainers customize your workout to maximize results and keep you motivated."
                          : card.description}
                      </p>
                    </div>
                  </div>
                  {expandedCard === index && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white/70 text-sm">
                        Our certified trainers bring years of experience and
                        dedication to help you reach your goals through
                        tailored programs, group classes, and nutritional
                        support.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg flex items-center gap-2 transform hover:-translate-y-1">
                <i className="fa fa-calendar-check-o"></i> Book Your Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
