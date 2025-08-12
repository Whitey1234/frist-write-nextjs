'use client'
import { useEffect, useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsPerson, BsChatDots } from 'react-icons/bs';
import Aos from 'aos';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  useEffect(()=>{
  Aos.init();
  },[])

  return (
    <section  data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="relative py-20 bg-gradient-to-br from-gray-50 to-indigo-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex items-center mb-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full">
            <HiOutlineMail className="mr-2" />
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="relative inline-block">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-purple-300 to-indigo-300 opacity-40 -z-1 transform translate-y-1"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to our friendly team—we're here to help!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl">
                  <FaMapMarkerAlt className="text-purple-600 text-xl" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-semibold text-gray-900">Our Location</h3>
                  <p className="text-gray-600 mt-1">123 Book Street, Literary District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl">
                  <FaPhone className="text-purple-600 text-xl" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-semibold text-gray-900">Phone Number</h3>
                  <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl">
                  <FaEnvelope className="text-purple-600 text-xl" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-semibold text-gray-900">Email Address</h3>
                  <p className="text-gray-600 mt-1">hello@fastwrite.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-xl">
                  <FaClock className="text-purple-600 text-xl" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-5">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebookF />, color: 'bg-blue-600 hover:bg-blue-700' },
                  { icon: <FaTwitter />, color: 'bg-sky-500 hover:bg-sky-600' },
                  { icon: <FaInstagram />, color: 'bg-pink-600 hover:bg-pink-700' },
                  { icon: <FaLinkedinIn />, color: 'bg-blue-700 hover:bg-blue-800' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className={`w-12 h-12 flex items-center justify-center text-white ${social.color} rounded-full transition-colors text-lg`}
                    aria-label={`Social media ${index}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <BsChatDots className="text-purple-600 mr-3" />
              Send Us a Message
            </h3>
            <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BsPerson className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <BsChatDots className="text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}