import MainLayout from "@/components/MainLayout";
import Image from "next/image";

import BookSelling from "@/components/BookSelling";

import NewArrivals from "@/components/NewArrivals";
import { AboutSection } from "@/components/AboutSection";
import ContactSection from "./contact/page";


export default async function Home() {
  
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/add`, );
  // const books = await res.json();
   const books = []
  return (
   
      <div>
     
       <BookSelling/>
       <NewArrivals books={books} />
       <AboutSection/>
       <ContactSection/>
      </div>
   
  );
}
