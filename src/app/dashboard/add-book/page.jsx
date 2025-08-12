"use client";

import { use, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/Auth/AuthProvider";
import { useRouter } from "next/navigation";
import withAuth from "@/Hoc/withAuth";


const AddBookPage = () => {
    const {user} =use(AuthContext)
    const router = useRouter()
     console.log(user?.displayName)
     const name  =  user?.displayName
  const [form, setForm] = useState({
    bookName: "",
    bookPhoto : "",
    subject: "",
    writerName: "",
    details: "",
    buy : "",
    addedBy: "TestUser" // Temporary hardcoded value for testing
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   // console.log("Frontend form data:", form);

    try {
      const res = await axios.post("/api/books/add", form);
      alert("Book added successfully!");
      setForm({ bookName: "", subject: "", writerName: "", details: "" });
      router.push('/allbooks')
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || error.message));
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add Student Book</h1>

        <label className="block mb-2">Book Name</label>
        <input type="text" name="bookName" value={form.bookName} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-4" />

        <label className="block mb-2">Book Photo</label>
        <input type="text" name="bookPhoto" value={form.bookPhoto} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-4" />

        <label className="block mb-2">Subject</label>
        <input type="text" name="subject" value={form.subject} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-4" />

        <label className="block mb-2">Writer's Name</label>
        <input type="text" name="writerName" value={form.writerName} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-4" />

        <label className="block mb-2"> Buy</label>
        <input type="number" name="buy" value={form.buy} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-4" />

        <label className="block mb-2">Book Details</label>
        <textarea name="details" value={form.details} onChange={handleChange} required className="w-full border px-3 py-2 rounded mb-4"></textarea>

        <label className="block mb-2">Added By</label>
        <input type="text" name="addedBy" value={name} disabled className="w-full border px-3 py-2 rounded mb-4 bg-gray-100" />

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 rounded">
          {loading ? "Saving..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddBookPage);