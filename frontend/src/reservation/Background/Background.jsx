import NatureVid from "../../assets/video/sea.mp4";

const Background = () => {
  return (
    <div className="fixed inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={NatureVid} type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;
