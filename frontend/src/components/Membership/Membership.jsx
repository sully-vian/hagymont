import TrainerImg2 from "../../assets/coach1.png";
import TrainerImg1 from "../../assets/coach2.png";
import TrainerImg3 from "../../assets/coach3.png";
import EssentialImg from "../../assets/member1.png";
import PerformanceImg from "../../assets/member2.png";
import ExecutiveImg from "../../assets/member3.png";
const memberPlans = [
  {
    title: "Essential Access",
    price: "From $1000/mo",
    image: EssentialImg,
    features: [
      "Unlimited 24/7 gym access",
      "Medical checkups (free, monthly)",
      "Group fitness classes (Yoga, HIIT, Pilates)",
      "Fitness performance tracking (AI-powered)",
      "Smart locker room with digital access",
      "Access to premium equipment zones",
      "Basic Spa access (sauna, steam room)",
      "Personalized nutrition guide (monthly)",
    ],
  },
  {
    title: "Performance Plus",
    price: "From $3000/mo",
    image: PerformanceImg,
    features: [
      "All in Essential Access",
      "Unlimited personal trainer sessions",
      "Full Recovery Zone (Cryotherapy, Hydrotherapy)",
      "Private group classes (max 6 people)",
      "Tennis, Pickleball & Squash courts",
      "Weekly wellness coaching & body analysis",
      "Virtual fitness content access (global)",
      "Priority booking for facilities",
    ],
  },
  {
    title: "Executive Elite",
    price: "From $5000/mo",
    image: ExecutiveImg,
    features: [
      "All in Performance Plus",
      "Access to indoor Golf facility & simulator",
      "Exclusive Fitness Cafe (custom fitness meals)",
      "VIP Spa services (massage, facial, infrared therapy)",
      "Private personal training lounge & studio",
      "Complimentary health supplements",
      "Private parking with valet",
      "Concierge support (travel, events)",
    ],
  },
];

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

const Membership = () => {
  return (
    <div className="container py-14">
      {/* Section header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold">Membership Plans</h1>
        <p>Refined plans for exceptional lifestyles.</p>
      </div>

      {/* Member Plans */}
      <h2 className="text-2xl font-semibold mb-4">For Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {memberPlans.map((plan, i) => (
          <PlanCard key={i} {...plan} />
        ))}
      </div>

      {/* Trainer Plans */}
      <h2 className="text-2xl font-semibold mb-4">For Coaches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {trainerPlans.map((plan, i) => (
          <PlanCard key={i} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Membership;
