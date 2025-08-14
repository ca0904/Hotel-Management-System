import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  const isLoggedIn = localStorage.getItem('jwtToken') ? true : false;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/static/homebg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Semi-transparent overlay for the video */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Content on top of the video */}
        <div className="relative container mx-auto text-center py-36 px-4 z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-red-600">Welcome to Luxury Haven</h1>
          <p className="text-xl md:text-2xl mt-4">Your own cozy and five-star comfort.</p>
          <div className="mt-8">
            <Link to="/booking">
              <button className="px-8 py-4 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition-all">
                Book Your Stay
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl text-red-600 font-semibold mb-4">Our Premium Services</h2>
          <p className="text-lg text-white mb-8">Enjoy the luxury and comfort of our top-notch facilities, with Netflix access, cozy rooms, and impeccable service.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Cards */}
            <div className="bg-gray-700 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Cozy Rooms</h3>
              <p>Each room is designed with comfort and relaxation in mind, featuring modern amenities and warm vibes.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Netflix Streaming</h3>
              <p>Relax and enjoy your favorite shows and movies on Netflix in your room, any time of the day.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Five-Star Dining</h3>
              <p>Our restaurant offers delicious meals and drinks to elevate your experience with gourmet flavors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl text-red-600 font-semibold mb-4">Ready for Your Dream Stay?</h2>
          <p className="text-lg text-white mb-8">Book now to experience luxury like never before.</p>
          <Link to="/booking">
            <button className="px-8 py-4 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition-all">
              Book Your Stay
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
