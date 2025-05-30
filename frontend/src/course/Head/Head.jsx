import image2 from "../../assets/pilates.png";
import image1 from "../../assets/yoga.png";

const Head = () => {
  return (
    <div className="relative h-[400px]">
      <h1 className="absolute bottom-4 left-4 text-4xl font-semibold text-violet-700 z-10">
        CHOOSE THE COURSE
      </h1>


      <div className="absolute bottom-4 right-4 flex gap-4 z-10">
        <img
          src={image1}
          alt="Yoga"
          className="w-[100px] h-auto"
        />

        <img
          src={image2}
          alt="pilates"
          className="w-[100px] h-auto"
        />
      </div>
    </div>
  );
};

export default Head;
