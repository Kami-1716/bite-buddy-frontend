import heroImage from "../assets/burger-image.jpg";
const Hero = () => {
  return (
    <img
      src={heroImage}
      alt="hero"
      className="w-full max-h-[600px] object-cover"
    />
  );
};

export default Hero;
