import BannerImg from "../../assets/1.png";
import Image1 from "../../assets/3.png";
import Image2 from "../../assets/4.png";
import Image3 from "../../assets/5.png";

const FoodData = [
  {
    image: Image1,
    rating: "⭐⭐⭐⭐⭐",
    ingredients: "Avocado, tofu, lettuce, cherry tomatoes, extra virgin olive oil, bird's eye chili, chia seeds, yuzu dressing",
    name: "Avocado Zen Bowl",
    desc: "A refreshing and balanced salad with creamy avocado and protein-rich tofu, elevated by rare spices and citrus yuzu essence.",
  },
  {
    image: Image2,
    rating: "⭐⭐⭐⭐⭐",
    ingredients: "Cucumber, lemon, purple cabbage, cherry tomatoes, sweet onions, black sesame, daikon radish, Himalayan pink salt, flaxseed oil",
    name: "Vibrant Detox Crunch",
    desc: "A vibrant raw veggie medley that detoxifies and energizes, rich in color, antioxidants, and exotic oils.",
  },
  {
    image: Image3,
    rating: "⭐⭐⭐⭐⭐",
    ingredients: "Prime-grade steak, romaine lettuce, heirloom cherry tomatoes, truffle salt, cracked peppercorn, rosemary olive oil",
    name: "Truffle Herb Steak Bowl",
    desc: "Succulent steak paired with crisp greens and aromatic truffle oil for a refined and satisfying protein-rich meal.",
  },
];

const TopList = () => {
  return (
    <div className="container py-14">
      {/* header section */}
      <div className="flex justify-between items-center mb-12">
        {/* Text Section */}
        <div className="w-1/2 text-left">
          <h1 className="text-4xl font-semibold">Fitness Meals</h1>
          <p className="text-lg text-center">Our top list</p>
        </div>

        {/* Banner image */}
        <div className="w-1/2">
          <img
            src={BannerImg}
            alt="Fitness Meals Banner"
            className="w-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* card section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {FoodData.map((item, index) => (
          <div
            key={index}
            className="bg-white/50 p-5 lg:p-6 rounded-3xl hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <img
              src={item.image}
              alt=""
              className="w-full sm:w-40 lg:w-[240px] mx-auto object-cover rounded-full img-shadow"
            />
            <div className="space-y-2 mt-4 text-center">
              <p className="text-red-500">{item.rating}</p>
              <p className="text-lg font-semibold">{item.name}</p>
              <p>{item.desc}</p>
              <p className="text-sm italic text-gray-700">{item.ingredients}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopList;
