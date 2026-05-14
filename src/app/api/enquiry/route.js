import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

// ➕ CREATE ENQUIRY
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      user_name,
      company_name,
      phone,
      user_email,
      message,
    } = body;

    // ✅ Validation
    if (!user_name || !company_name || !phone || !user_email || !message) {
      return Response.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return Response.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      user_name,
      company_name,
      phone,
      user_email,
      message,
    });

    return Response.json({ success: true, data: enquiry });

  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({ success: false });
  }
}

// 📥 GET ENQUIRIES
export async function GET() {
  try {
    await connectDB();

    const data = await Enquiry.find().sort({ createdAt: -1 });

    return Response.json({ success: true, data });

  } catch (err) {
    console.error("GET ERROR:", err);
    return Response.json({ success: false, data: [] });
  }
}

// ❌ DELETE ENQUIRY
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Enquiry.findByIdAndDelete(id);

    return Response.json({ success: true });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({ success: false });
  }
}