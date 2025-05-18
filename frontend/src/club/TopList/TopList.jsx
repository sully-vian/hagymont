import Image1 from "../../assets/gym2.png";
import Image2 from "../../assets/gym3.png";
import Image3 from "../../assets/gym4.png";

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
    <div className="relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-10 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
    </div>
  );
};

export default TopList;
