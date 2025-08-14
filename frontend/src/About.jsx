import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
                    <p className="text-xl text-gray-300">Experience unparalleled comfort and service at Luxury Haven</p>
                </div>
            </section>

            <main className="flex-grow container mx-auto p-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mt-4">
                        At Luxury Haven, we are dedicated to offering the best facilities and experiences for every guest.
                        We are driven by our commitment to providing world-class hospitality with a focus on comfort, cleanliness, and personalized service.
                    </p>
                </div>

                {/* Facilities and Experience Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800">Our Facilities</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mt-4 mb-6">
                        We offer premium services to ensure that every stay is exceptional. Our facilities include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg p-6 rounded-lg">
                            <img src="/static/clean.jpg" alt="Clean Room" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Spotlessly Clean Rooms</h3>
                            <p className="text-gray-600">Our rooms are cleaned to perfection, ensuring a fresh and comfortable environment every time you visit. We believe cleanliness is key to a great stay.</p>
                        </div>
                        <div className="bg-white shadow-lg p-6 rounded-lg">
                            <img src="/static/faci.jpg" alt="Premium Facilities" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Facilities</h3>
                            <p className="text-gray-600">From 24/7 room service to luxurious spas and fine dining, we provide world-class amenities to make your stay unforgettable.</p>
                        </div>
                        <div className="bg-white shadow-lg p-6 rounded-lg">
                            <img src="/static/staff.jpg" alt="Friendly Staff" className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Friendly and Professional Staff</h3>
                            <p className="text-gray-600">Our team of dedicated professionals are here to make your stay as comfortable and enjoyable as possible. Customer service is our priority.</p>
                        </div>
                    </div>
                </div>

                {/* Awards and Recognition Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800">Our Achievements</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mt-4 mb-6">
                        We take great pride in the recognition we have received over the years for our commitment to excellence. Here are some of our achievements:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
                            <img src="/static/hos.jpg" alt="Award 1" className="w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Hospitality 2022</h3>
                            <p className="text-gray-600">We were awarded the "Best Hospitality" for our exceptional guest experience and service standards.</p>
                        </div>
                        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
                            <img src="/static/lux.jpg" alt="Award 2" className="w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Top Luxury Hotel 2023</h3>
                            <p className="text-gray-600">Named "Top Luxury Hotel" for our outstanding facilities, comfort, and luxurious experiences.</p>
                        </div>
                        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
                            <img src="/static/cle.jpg" alt="Award 3" className="w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Excellence in Cleanliness</h3>
                            <p className="text-gray-600">We have been recognized for maintaining the highest standards of cleanliness and hygiene throughout our premises.</p>
                        </div>
                    </div>
                </div>

                {/* Established Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mt-4">
                        Established in 2010, Luxury Haven has been providing a top-tier experience for guests from all over the world. Over the years, we have grown into a trusted name in hospitality, offering our guests unparalleled comfort, service, and luxury.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
