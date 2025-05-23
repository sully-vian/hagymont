

import TrainerImg2 from "../../assets/coach1.png";
import TrainerImg1 from "../../assets/coach2.png";
import TrainerImg3 from "../../assets/coach3.png";

const trainerPlans = [
  {
    title: "Coach Access",
    image: TrainerImg1,
    features: [
    "Teaching access to group classes",
    "No access to personal training zones",
    "No equipment or gym floor usage",
    "Limited access to coaching lounge",
    ],
  },
  {
    title: "Coach Pro",
    image: TrainerImg2,
    features: [
    "Full teaching and training rights",
    "Unlimited access to gym equipment",
    "Use of recovery equipment (stretch zones)",
    "Access to smart locker rooms",
    ],
  },
  {
    title: "Coach Elite",
    image: TrainerImg3,
    features: [
    "Unlimited facility access (gym, pool, courts)",
    "VIP Spa & wellness services (massage, hydrotherapy)",
    "Exclusive access to Fitness Café & lounge",
    "Monthly medical checkups & health analysis",
    "Dedicated coaching suite & private studio",
    ],
  },
];


const PlanCard = ({ title, price, features, image }) => (
  <div className="bg-white/50 p-6 rounded-3xl hover:scale-105 transition duration-300">
    {image && (
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-contain mb-4 rounded-xl"
      />
    )}
    <h3 className="text-2xl font-bold mb-2 text-orange-500">{title}</h3>
    <p className="text-xl text-red-500 mb-4">{price}</p>
    <ul className="space-y-1 text-sm">
      {features.map((f, i) => (
        <li key={i}>• {f}</li>
      ))}
    </ul>
  </div>
);

const Coach = () => {
    return (
        <div className="container py-14">
            {/* Section header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-semibold">
                    Embrace the Role of <span className="text-pink-600 font-bold">Coach</span>
                </h1>
                <p>Discover the pathways to becoming an integral part of our coaching community.</p>
            </div>

            {/* Trainer Plans */}
            <h2 className="text-2xl font-semibold mb-4">Journey to Become a Coach</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {trainerPlans.map((plan, i) => (
                    <PlanCard key={i} {...plan} />
                ))}
            </div>
        </div>
    );
};

export default Coach;
