import { FaFacebookF, FaInstagram, FaTwitter, FaHome, FaYoutube, FaPhone } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#2C2C47] text-white px-16">
      <div className="container grid grid-cols-1 md:grid-cols-3 px-10">
        <div className="flex flex-col space-y-5 py-2 md:py-4 text-sm md:text-lg">
          <Link
            to="/"
            title="Go to Home Page"
            className="flex items-center gap-2 font-bold hover:text-orange-400 active:text-orange-500 transition duration-200"
          >
            <FaHome className="text-xl mr-1" /> Home
          </Link>
          <Link
            to="/about"
            title="Learn About Us"
            className="flex items-center gap-2 font-bold hover:text-orange-400 active:text-orange-500 transition duration-200"
          >
            <FaCircleInfo className="text-lg mr-1 mt-1" /> About
          </Link>
          <a
            href="https://www.youtube.com"
            title="Visit our YouTube channel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold hover:text-orange-400 active:text-orange-500 transition duration-200"
          >
            <FaYoutube className="text-lg mr-1 mt-1" /> Youtube
          </a>
          <Link
            title="Contact Us"
            to="/contact"
            className="flex items-center gap-2 font-bold hover:text-orange-400 active:text-orange-500 transition duration-200"
          >
            <FaPhone className="text-lg mr-1" /> Support
          </Link>
        </div>

        <div className="space-y-2 md:space-y-4 py-2 md:py-4 text-sm md:text-xl place-self-end">
          <p className="font-bold">Email:</p>
          <p>abcxyz@gmail.com</p>
          <p className="font-bold">Phone:</p>
          <p>0978552222</p>
          <p className="font-bold">Address:</p>
          <p>125444, Xuan Thuy, Ha Noi</p>
        </div>

        <div className="flex justify-end font-serif md:text-3xl pt-24 md:pt-44">
          <Link to="/" title="Go to Home Page">
            <span className="text-white hover:text-orange-400 active:text-orange-500 transition duration-200">
              Fashion
            </span>
            <span className="text-green-400">X</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-b border-gray-500 mt-6 py-2 md:py-4 flex max-w-[93%] mx-auto justify-center space-x-8">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" title="Follow us on Facebook">
          <FaFacebookF className="md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" title="Follow us on Instagram">
          <FaInstagram className="md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Follow us on Twitter">
          <FaTwitter className="md:text-xl cursor-pointer hover:text-orange-400 active:text-orange-500 transition duration-200" />
        </a>
      </div>

      <div className="text-left text-base mt-4 px-10 pb-2 text-sm md:text-lg">© 2025 FashionX - all prices in VND</div>
    </footer>
  );
}

export default Footer;
