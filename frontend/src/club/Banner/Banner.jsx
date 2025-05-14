import BannerImg from "../../assets/6.png";

const Banner = () => {
  return (
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* img section */}
        <div className="flex justify-center items-center">
          <img src={BannerImg} alt="HaGymont Banner" className="w-full h-auto rounded-lg" />
        </div>

        {/* text section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold text-gray-800">
            HaGymont is <br /> <span className="text-rose-600">always your best gym choice</span>
          </h1>

          <p className="py-4 font-medium text-lg text-gray-700">
            <span className="font-bold text-blue-600">HaGymont</span> is the world's premier luxury wellness center. We offer
            state-of-the-art gyms, high-end spas, medical check-up centers, Chinese and Western medicine clinics, meditation spaces, 
            <span className="text-green-500 font-semibold"> pickleball courts</span>, and cafes, all designed to support your health journey.
          </p>

          <p className="font-medium text-lg text-gray-700">
            Whether your goal is <span className="font-bold text-red-500">enhancement</span>, <span className="font-bold text-yellow-500">healing</span>, or <span className="font-bold text-orange-500">longevity</span>, HaGymont is here to guide you to a better, healthier lifestyle.
          </p>

          <p className="pt-4 font-semibold text-lg text-gray-600">
            Our exclusive <span className="font-bold text-purple-500">café</span>, curated treatments, and luxurious <span className="text-pink-500">spa</span> are also open to the public with day passes, so everyone can experience the best in wellness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
