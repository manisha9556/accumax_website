import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory"; // 🔥 THIS LINE
import fs from "fs";
import path from "path";

// ➕ CREATE
export async function POST(req) {
  try {
    await connectDB();
    const { name } = await req.json();

    if (!name) {
      return Response.json({ success: false, message: "Name required" });
    }

    const newCategory = await BlogCategory.create({ name });

    return Response.json({ success: true, data: newCategory });

  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}

// 📥 GET
export async function GET() {
  try {
    await connectDB();

    const data = await BlogCategory.find().sort({ createdAt: -1 });

    return Response.json({ success: true, data });

  } catch (err) {
    return Response.json({ success: false });
  }
}

// ✏️ UPDATE
export async function PUT(req) {
  try {
    await connectDB();

    const { id, name, status } = await req.json();

    const updated = await BlogCategory.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );

    return Response.json({ success: true, data: updated });

  } catch (err) {
    return Response.json({ success: false });
  }
}

// ❌ DELETE
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    await BlogCategory.findByIdAndDelete(id);

    return Response.json({ success: true });

  } catch (err) {
    return Response.json({ success: false });
  }
}



