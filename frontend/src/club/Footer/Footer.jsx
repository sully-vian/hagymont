import NatureVid from "../../assets/video/yoga2.mp4";

const Footer = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={NatureVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Footer;
