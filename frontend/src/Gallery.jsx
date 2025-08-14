import Navbar from "./Navbar";
import Footer from "./Footer";

const Gallery = () => {
    // Placeholder images; replace these URLs with actual images.
    const images = [
        "/public/static/mumbai-1_61a1d8382ce02.webp",
        "/public/static/mumbai-1_61a1d8382ce02.webp",
        "/public/static/mumbai-1_61a1d8382ce02.webp",
        "/public/static/mumbai-1_61a1d8382ce02.webp",
        "/public/static/mumbai-1_61a1d8382ce02.webp",
        "/public/static/mumbai-1_61a1d8382ce02.webp",

    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Gallery</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="bg-gray-200 p-2 rounded-lg shadow-md">
                            <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Gallery;
