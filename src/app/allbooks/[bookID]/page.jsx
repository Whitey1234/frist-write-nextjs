'use client';

import { Pen, BookOpen, Star, ShoppingCart, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import withAuth from '@/Hoc/withAuth';

const BookDetails = ({ params }) => {
  const { bookID: bookId } = params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${bookId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Book not found");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch book details");
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Book Details...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <p className="text-gray-600 mb-6">We couldn't find the book you're looking for.</p>
          <Link href="/allbooks" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <ArrowLeft size={16} className="mr-2" />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/allbooks" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
            <ArrowLeft size={18} className="mr-2" />
            Back to all books
          </Link>
        </div>

        {/* Book Details Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Cover Section */}
            <div className="md:w-1/3 p-6 bg-gray-100 flex items-center justify-center">
              <div className="relative w-full h-96 md:h-full">
                <img
                  src={book.bookPhoto || "https://placehold.co/400x600/png?text=No+Cover"}
                  alt={book.bookName}
                  className="w-full h-full object-contain rounded-lg shadow-md"
                />
                {book.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {book.discount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Book Info Section */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.bookName}</h1>
                  <p className="text-lg text-gray-600 mb-4">by {book.writerName}</p>
                </div>
                <div className="flex space-x-3">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < (book.rating || 0) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-gray-500">({book.reviews || 0} reviews)</span>
              </div>

              {/* Subject & Details */}
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
                  {book.subject}
                </span>
                <p className="text-gray-700 leading-relaxed">{book.details}</p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Publisher</h3>
                  <p className="text-gray-900">{book.publisher || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Published</h3>
                  <p className="text-gray-900">{book.publishedDate || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                  <p className="text-gray-900">{book.pages || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Language</h3>
                  <p className="text-gray-900">{book.language || "English"}</p>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">${book.buy || "N/A"}</span>
                    {book.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-3">${book.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                      <BookOpen size={20} className="text-gray-600" />
                    </button>
                    <button className="flex items-center px-6 py-3  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg">
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          {/* You would fetch related books here */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Sample related book cards */}
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <div className="h-48 bg-gray-100 mb-4 rounded-lg"></div>
              <h3 className="font-medium text-gray-900 mb-1">Related Book 1</h3>
              <p className="text-sm text-gray-600 mb-2">Author Name</p>
              <p className="text-lg font-bold text-gray-900">$19.99</p>
            </div>
            {/* Repeat for more related books */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(BookDetails);