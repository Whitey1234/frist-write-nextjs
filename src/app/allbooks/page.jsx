
import { Pen, BookOpen, Star, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function BooksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/add`);
  const books = await res.json();
//  const books = [ ]
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2  text-center">📚 Available Books</h1>
        <p className="text-gray-600 mb-8 text-center">Find your next great read from our collection</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto w-11/12">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Book Cover Image */}
              <div className="relative pt-[150%] bg-gray-100 overflow-hidden">
                <img
                  src={book.bookPhoto || "https://placehold.co/400x600/png?text=No+Cover"}
                  alt={book.bookName}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4"
                />
                {book.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {book.discount}% OFF
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">{book.bookName}</h2>
                <p className="text-sm text-gray-600 mb-2">{book.subject}</p>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < (book.rating || 0) ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({book.reviews || 0})</span>
                </div>

                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{book.details}</p>

                <div className="mt-auto">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Pen size={14} className="mr-1" />
                    <span className="truncate">{book.writerName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${book.buy || "N/A"}</span>
                      {book.originalPrice && (
                        <span className="text-xs text-gray-500 line-through ml-2">${book.originalPrice}</span>
                      )}
                    </div>
                    <Link href = {`/allbooks/${book._id}`}>
                    <button className=" bg-gradient-to-r from-purple-600 to-pink-600 t  hover:from-purple-700 hover:to-blue-700 text-white p-2 rounded-full transition">
                      <ShoppingCart size={18} />
                    </button>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}