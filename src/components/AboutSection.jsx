'use client'
import Aos from "aos";
import { useEffect } from "react";
import CountUp from "react-countup";

export function AboutSection() {
    useEffect(()=>{
        
   Aos.init();
    },[])
  return (
    <section data-aos="fade-up"
     data-aos-duration="3000" className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 to-amber-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1 text-sm font-semibold text-white-800 bg-gradient-to-r from-pink-300 via-purple-500 to-indigo-300 rounded-full">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="relative inline-block">
              <span className="relative z-10">Discover Fast Write</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-40 -z-1 transform translate-y-1"></span>
            </span>
          </h2>
          <div className="w-24 h-1bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mb-8"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Bookstore interior"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2 text-left">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Welcome to <span className="font-bold text-indigo-700">Fast Write</span>, where literature meets passion. 
              We've curated a sanctuary for book lovers, offering an extensive collection of academic, 
              fiction, and non-fiction titles that inspire, educate, and entertain.
            </p>
            
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Founded with the vision to make knowledge accessible to all, we take pride in our 
              carefully selected inventory that caters to students, researchers, and casual readers alike. 
              Our team of bibliophiles ensures every recommendation comes from a place of deep understanding 
              and love for the written word.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:rounded-b-3xl text-white font-medium rounded-lg transition-colors duration-300">
                Our Collection
              </button>
              <button className="px-6 py-3 border border-gray-300 hover: text-gray-700 hover:text-indigo-700 font-medium rounded-lg transition-colors duration-300">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { number: "10", label: "Books Available" },
            { number: "200", label: "Publishers" },
            { number: "15", label: "Years Experience" },
            { number: "24", label: "Customer Support" }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center hover:bg-gradient-to-r hover:from-pink-300 hover:via-purple-300 hover:to-indigo-300">
               
              <p className="text-3xl font-bold text-indigo-600 mb-2">  <CountUp end={stat.number} /> +</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}