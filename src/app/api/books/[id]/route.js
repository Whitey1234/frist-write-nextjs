import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET a single book by ID
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("first-write");
    const book = await db.collection("books").findOne({ _id: new ObjectId(id) });

    if (!book) {
      return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// UPDATE a book by ID
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { bookName, subject, writerName, details, addedBy, bookPhoto } = body;

  if (!bookName || !subject || !writerName || !details || !addedBy) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("first-write");
    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          bookName,
          subject,
          writerName,
          details,
          addedBy,
          bookPhoto: bookPhoto || null,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Book updated successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// DELETE a book by ID
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("first-write");
    const result = await db.collection("books").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Book deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}