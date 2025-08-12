'use client';

import { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, X, Save } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import withAuth from '@/Hoc/withAuth';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    bookName: '',
    subject: '',
    writerName: '',
    details: ''
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Fetch all books on mount
  useEffect(() => {
    axios.get('/api/books/add')
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Delete book by id
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`/api/books/${id}`);
      alert('Book deleted successfully');
      axios.get('/api/books/add')
        .then(res => {
          setBooks(res.data);
        })
    } catch (error) {
      alert('Failed to delete book');
    }
  };

  // Open edit modal with book data
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      bookName: book.bookName,
      subject: book.subject,
      writerName: book.writerName,
      details: book.details || ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit edited book
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`/api/books/${editingBook._id}`, { ...formData, addedBy: editingBook.addedBy });
      setEditingBook(null);
      alert('Book updated successfully');
      axios.get('/api/books/add')
        .then(res => {
          setBooks(res.data);
        })
    } catch (error) {
      alert('Failed to update book');
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!books.length) return <div className="p-6 text-center">No books found.</div>;

  return (
    <div className="p-4">
      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">Edit Book</h2>
              <button 
                onClick={() => setEditingBook(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
                <input
                  type="text"
                  name="bookName"
                  value={formData.bookName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Writer</label>
                <input
                  type="text"
                  name="writerName"
                  value={formData.writerName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <Save size={18} className="mr-1" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Books</h1>
        <Link 
          href="/dashboard/add-book" 
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} className="mr-1" />
          {!isMobile && 'Add Book'}
        </Link>
      </div>

      {isMobile ? (
        // Mobile view - cards
        <div className="space-y-4">
          {books.map(book => (
            <div key={book._id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{book.bookName}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Subject:</span> {book.subject}</p>
              <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Writer:</span> {book.writerName}</p>
              <p className="text-gray-600 text-sm"><span className="font-medium">Added by:</span> {book.addedBy}</p>
            </div>
          ))}
        </div>
      ) : (
        // Desktop view - table
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Writer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map(book => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.writerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.addedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default withAuth(BookManagement);