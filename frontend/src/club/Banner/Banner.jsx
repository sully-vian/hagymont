import BannerImg from "../../assets/exercice.png";

const Banner = () => {
  return (
    <div className="container py-14">
      <div className="max-w-7xl mx-auto bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl p-10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* img section */}
          <div className="flex justify-center items-center">
            <img
              src={BannerImg}
              alt="HaGymont Banner"
              className="w-full h-auto rounded-lg max-w-[400px]"
            />

          </div>

          {/* text section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              <span className="text-green-600">Experience</span> <br />
              <span className="text-rose-600">Wellness</span> and{" "}
              <span className="text-blue-600">Strength</span> with{" "}
              <span className="text-black-600">HaGymont</span>
            </h1>

            <p className="py-4 font-medium text-lg text-gray-700 dark:text-gray-300">
              <span className="font-bold text-indigo-600">HaGymont</span> is
              proudly present in over{" "}
              <span className="text-rose-600 font-semibold">50 countries</span>{" "}
              worldwide. Our clubs are established across vibrant cities in{" "}
              <span className="text-purple-600 font-semibold">Europe</span>, dynamic
              hubs in <span className="text-yellow-500 font-semibold">Asia</span>, as well as in{" "}
              <span className="text-pink-500 font-semibold">Australia</span> and the 
              <span className="text-amber-700 font-semibold">mericas</span>. 
              Wherever life takes you, HaGymont brings world-class wellness closer to home.
            </p>

            <p className="font-medium text-lg text-gray-700 dark:text-gray-300">
              We commit to delivering an exceptional, consistent experience that empowers you
              to achieve your health goals—whether it’s{" "}
              <span className="text-red-500 font-bold">performance</span>,{" "}
              <span className="text-yellow-400 font-bold">recovery</span>, or{" "}
              <span className="text-orange-500 font-bold">longevity</span>.
            </p>

            <p className="pt-4 font-semibold text-lg text-gray-600 dark:text-gray-400">
              Our exclusive{" "}
              <span className="font-bold text-purple-500">café</span>, signature treatments,
              and luxurious <span className="text-pink-500">spa</span> services are open to the public with day passes,
              inviting everyone to indulge in the art of wellness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
