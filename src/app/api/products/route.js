import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const data = await Product.find({ status: { $ne: "Inactive" } })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    });
  } catch (err) {
    console.error("PUBLIC PRODUCTS GET ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch products",
        data: [],
      },
      { status: 500 }
    );
  }
}
