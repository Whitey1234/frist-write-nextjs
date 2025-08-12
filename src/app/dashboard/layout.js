"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg w-64 p-5 fixed h-full transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-6">📚 Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/dashboard/add-book" className="block p-2 hover:bg-gray-200 rounded">Add Book</Link>
          <Link href="/dashboard/profile" className="block p-2 hover:bg-gray-200 rounded">Profile</Link>
          <Link href="/dashboard/manage-books" className="block p-2 hover:bg-gray-200 rounded">Book Management</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Menu Button */}
        <button
          className="p-4 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
