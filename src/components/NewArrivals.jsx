'use client'
import Link from "next/link";
import 'aos/dist/aos.css'; // AOS styles
import Aos from "aos";
import { useEffect } from "react";

export default function NewArrivals({ books }) {
  useEffect(() => {
    Aos.init({
      duration: 3000, // Animation duration in ms
      once: true,     // Animate only once
    });
  }, []);
  return (
    <section data-aos="fade-up" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 relative inline-block">
            <span className="relative z-10">
               New Arrivals
              <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-200 opacity-60 -z-1 transform translate-y-1"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of books fresh off the press
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books?.slice(0, 8).map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2 group"
            >
              {/* Book Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={book.bookPhoto || "https://placehold.co/600x400/f5f5f5/cccccc?text=No+Image"}
                  alt={book.bookName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Book Info */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2">{book.bookName}</h3>
                <p className="text-gray-600 mb-3">{book.writerName}</p>
                
                {/* Price and Button */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-pink-600">৳ {book.buy}</span>
                  <Link href={`/allbooks/${book._id}`}>
                    <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:bg-gradient-to-r hover:from-violet-500 hove:via-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Add to Cart
                  </button>
                  </Link>
                
                </div>
              </div>

              {/* Ribbon for New */}
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                NEW
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link href={'/allbooks'}>
          <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:btn hover:btn-dash hover:outline text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 inline-flex items-center">
            View All New Arrivals
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          </Link>
          
        </div>
      </div>
    </section>
  );
}