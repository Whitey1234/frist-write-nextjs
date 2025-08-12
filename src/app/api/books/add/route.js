import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// get data 

//GET - Fetch all books

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("first-write"); // DB name

    const books = await db.collection("books").find({}).toArray();

    return new Response(JSON.stringify(books), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch books" }), { status: 500 });
  }
}


//post dsta

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("first-write"); //  DB name

    const requestBody = await req.json();
    console.log("Backend received data:", requestBody);

    const { bookName, bookPhoto, subject, writerName, buy, details, addedBy } = requestBody;

    if (!bookName  || !bookPhoto|| !subject || !writerName || !details || !addedBy || !buy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBook = {
      bookName,
      bookPhoto,
      subject,
      writerName,
      buy,
      details,
      addedBy,
      createdAt: new Date(),
    }; 

    const result = await db.collection("books").insertOne(newBook);

    return NextResponse.json({ message: "Book added successfully", bookId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Add book error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
