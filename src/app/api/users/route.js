import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("first-write"); // replace with your DB name if needed
    await db.command({ ping: 1 });

    return new Response(JSON.stringify({ message: "✅ MongoDB Connected!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "❌ MongoDB connection failed", details: error.message }), { status: 500 });
  }
}

