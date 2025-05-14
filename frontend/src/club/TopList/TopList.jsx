import Image1 from "../../assets/3.png";
import Image2 from "../../assets/4.png";
import Image3 from "../../assets/5.png";
import BannerImg from "../../assets/fitness.png";

// 三个体育俱乐部
const ClubData = [
  {
    image: Image1,
    name: "Club Sportif Toulouse",
    location: "Toulouse, France",
  },
  {
    image: Image2,
    name: "Paris Athletic Center",
    location: "Paris, France",
  },
  {
    image: Image3,
    name: "Lyon Fitness Hub",
    location: "Lyon, France",
  },
];

const TopList = () => {
  return (
    <div className="container py-14 relative">
     

      {/* 右下角缩小版 Banner 图片 */}
      <img
        src={BannerImg}
        alt="Fitness Banner"
        className="absolute bottom-0 right-0 w-40 h-auto m-4 z-0 opacity-80"
      />

      {/* 卡片区 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-20 relative">
        {ClubData.map((item, index) => (
          <div
            key={index}
            className="bg-white/60 p-5 lg:p-6 rounded-3xl hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full sm:w-40 lg:w-[240px] mx-auto object-cover rounded-full img-shadow"
            />
            <div className="mt-4 space-y-1">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopList;
