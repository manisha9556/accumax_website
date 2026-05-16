import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(_req, { params }) {
  try {
    const { slug } = await params;
    const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

    await connectDB();

    const product = await Product.findOne({
      status: { $ne: "Inactive" },
      $or: [{ slugPath }, { slug: slugPath }],
    }).lean();

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: JSON.parse(JSON.stringify(product)),
    });
  } catch (err) {
    console.error("PUBLIC PRODUCT DETAIL GET ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch product",
      },
      { status: 500 }
    );
  }
}
