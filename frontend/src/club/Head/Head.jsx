import room from "../../assets/fitness.png";

const Head = () => {
  return (
    <div className="relative h-[400px]">
      <h1 className="absolute bottom-4 left-4 text-4xl font-semibold text-blue-600 z-10">
        CHOOSE THE CLUB
      </h1>

      <img
        src={room}
        alt="Fitness"
        className="absolute bottom-4 right-4 w-[120px] h-auto z-10"
      />
    </div>
  );
};

export default Head;
