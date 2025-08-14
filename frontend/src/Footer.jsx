const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 p-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                <p className="text-sm">
                    <a href="/about" className="hover:text-white">
                        About Us
                    </a>{" "}
                    |{" "}
                    <a href="/contact" className="hover:text-white">
                        Contact
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
