'use client'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram,  
  FaLinkedinIn,
  FaBookOpen,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import Link from 'next/link';
import Aos from 'aos';
import { useEffect } from 'react';

export function Footer() {
     useEffect(()=>{
  Aos.init();
     },[])
  return (
    <footer data-aos="flip-down" className="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-200 border-5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 rounded-lg mr-3">
                <MdOutlineLocalLibrary className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Fast Write
              </span>
            </div>
            <p className="text-gray-600">
              Your premier destination for academic, fiction, and non-fiction books. We believe in the power of knowledge.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebookF />, color: 'text-blue-600 hover:text-blue-700' },
                { icon: <FaTwitter />, color: 'text-sky-500 hover:text-sky-600' },
                { icon: <FaInstagram />, color: 'text-pink-600 hover:text-pink-700' },
                { icon: <FaLinkedinIn />, color: 'text-blue-700 hover:text-blue-800' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`text-xl ${social.color} transition-colors`}
                  aria-label={`Social media ${index}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Shop', 'Categories', 'New Arrivals', 'Bestsellers'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-clip-text hover:text-transparent transition-all flex items-center">
                    <FaBookOpen className="mr-2 text-sm" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {['My Account', 'Order Tracking', 'Wishlist', 'Shipping Policy', 'Returns'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-clip-text hover:text-transparent transition-all">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 rounded-lg mr-3">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <span className="text-gray-600">123 Book Street, Literary District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 rounded-lg mr-3">
                  <FaPhone className="text-white" />
                </div>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-2 rounded-lg mr-3">
                  <FaEnvelope className="text-white" />
                </div>
                <span className="text-gray-600">hello@fastwrite.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Fast Write. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-clip-text hover:text-transparent text-sm transition-all">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-clip-text hover:text-transparent text-sm transition-all">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-clip-text hover:text-transparent text-sm transition-all">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}