import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("first-write"); // replace with your DB name

    const { bookName, subject, writerName, details, addedBy } = await req.json();

    if (!bookName || !subject || !writerName || !details || !addedBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBook = {
      bookName,
      subject,
      writerName,
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
