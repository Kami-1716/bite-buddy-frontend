const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-center md:text-left">
          <h3 className="text-3xl font-bold">BiteBuddy</h3>
          <p className="text-lg">Bringing Flavor to Your Fingertips</p>
        </div>
        <div className="flex flex-wrap gap-4 text-lg font-bold">
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
          <a href="#" className="text-white">
            Privacy Policy
          </a>
          <a href="#" className="text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
