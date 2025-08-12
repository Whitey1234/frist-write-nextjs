// components/BookCarousel.js
'use client'
import { useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const BookCarousel = () => {
  // Sample book data with gradient options
//   https://i.ibb.co.com/B26SqXJ4/Whats-App-Image-2025-08-12-at-4-08-59-AM-1.jpg
// https://i.ibb.co.com/TBnGR4v8/Whats-App-Image-2025-08-12-at-4-08-59-AM.jpg
  const books = [
    {
      id: 1,
      title: "Bestselling Novel",
      author: "Jane Doe",
      image: "/img.jpg",
      discount: "30% OFF",
      description: "The latest critically acclaimed masterpiece",
      gradient: "bg-gradient-to-r from-purple-900/80 via-indigo-900/70 to-blue-900/80"
    },
    {
      id: 2,
      title: "Science Fiction Adventure",
      author: "John Smith",
      image: "/img.jpg",
      discount: "25% OFF",
      description: "Journey through galaxies in this epic tale",
      gradient: "bg-gradient-to-r from-amber-900/80 via-red-900/70 to-rose-900/80"
    },
    {
      id: 3,
      title: "Self-Help Guide",
      author: "Alex Johnson",
      image: "/img.jpg",
      discount: "20% OFF",
      description: "Transform your life with these powerful techniques",
      gradient: "bg-gradient-to-r from-emerald-900/80 via-teal-900/70 to-cyan-900/80"
    }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 rounded-xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="relative aspect-[16/9] md:aspect-[3/1] w-full">
              {/* Book image */}
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Gradient overlay with book details */}
              <div className={`absolute inset-0 ${book.gradient} flex items-center p-8 md:p-12`}>
                <div className="max-w-md text-white">
                  <span className="inline-block bg-amber-500 text-amber-900 font-bold px-3 py-1 rounded-full text-sm mb-3">
                    {book.discount}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">{book.title}</h2>
                  <p className="text-lg md:text-xl mb-3">by {book.author}</p>
                  <p className="text-sm md:text-base mb-4">{book.description}</p>
                  <button className="bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold px-6 py-2 rounded-full transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Navigation buttons */}
        <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-black !bg-opacity-30 hover:!bg-opacity-50 rounded-full !left-4"></div>
        <div className="swiper-button-next !text-white !w-12 !h-12 !bg-black !bg-opacity-30 hover:!bg-opacity-50 rounded-full !right-4"></div>
      </Swiper>
    </div>
  );
};

export default BookCarousel;