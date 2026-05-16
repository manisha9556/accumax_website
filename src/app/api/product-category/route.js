import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { categories as defaultCategories } from "@/data/categories";

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const seedDefaultCategories = async () => {
  const count = await ProductCategory.countDocuments();
  if (count > 0) {
    return;
  }

  await ProductCategory.insertMany(
    defaultCategories.map((category, index) => ({
      title: category.title,
      slug: category.slug || slugify(category.title),
      order: index,
      status: "Active",
    }))
  );
};

export async function GET() {
  try {
    await connectDB();
    await seedDefaultCategories();

    const data = await ProductCategory.find()
      .sort({ order: 1, title: 1 })
      .lean();

    return Response.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("PRODUCT CATEGORY GET ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch product categories",
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const title = String(body.title || "").trim();
    const slug = slugify(body.slug || title);
    const status = body.status === "Inactive" ? "Inactive" : "Active";
    const order = Number.isFinite(Number(body.order)) ? Number(body.order) : 0;

    if (!title) {
      return Response.json(
        {
          success: false,
          message: "Category title is required",
        },
        { status: 400 }
      );
    }

    const existing = await ProductCategory.findOne({ slug }).lean();
    if (existing) {
      return Response.json(
        {
          success: false,
          message: "Category slug already exists",
        },
        { status: 409 }
      );
    }

    const data = await ProductCategory.create({
      title,
      slug,
      status,
      order,
    });

    return Response.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("PRODUCT CATEGORY POST ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to create product category",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const id = String(body.id || "");
    const title = String(body.title || "").trim();
    const slug = slugify(body.slug || title);
    const status = body.status === "Inactive" ? "Inactive" : "Active";
    const order = Number.isFinite(Number(body.order)) ? Number(body.order) : 0;

    if (!id || !title) {
      return Response.json(
        {
          success: false,
          message: "Category id and title are required",
        },
        { status: 400 }
      );
    }

    const clash = await ProductCategory.findOne({
      slug,
      _id: { $ne: id },
    }).lean();

    if (clash) {
      return Response.json(
        {
          success: false,
          message: "Category slug already exists",
        },
        { status: 409 }
      );
    }

    const data = await ProductCategory.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        status,
        order,
      },
      { new: true }
    );

    return Response.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("PRODUCT CATEGORY PUT ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to update product category",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Category id is required",
        },
        { status: 400 }
      );
    }

    const category = await ProductCategory.findById(id).lean();
    if (!category) {
      return Response.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      );
    }

    const linkedProducts = await Product.countDocuments({
      $or: [{ categoryId: id }, { category: category.title }],
    });

    if (linkedProducts > 0) {
      return Response.json(
        {
          success: false,
          message: "Delete products using this category first",
        },
        { status: 409 }
      );
    }

    await ProductCategory.findByIdAndDelete(id);

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error("PRODUCT CATEGORY DELETE ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to delete product category",
      },
      { status: 500 }
    );
  }
}
