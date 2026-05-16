import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import fs from "fs";
import path from "path";

const normalizeSlugPath = (value) =>
  String(value || "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/^products\/?/, "")
    .replace(/\/+$/, "")
    .toLowerCase();

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseJson = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const cleanStringList = (value) =>
  parseJson(value, [])
    .map((item) => String(item || "").trim())
    .filter(Boolean);

const cleanSpecifications = (value) =>
  parseJson(value, [])
    .map((item) => ({
      label: String(item?.label || "").trim(),
      value: String(item?.value || "").trim(),
    }))
    .filter((item) => item.label && item.value);

const saveUploadedFile = async (file) => {
  if (!file || !file.name) {
    return "";
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${file.name}`;
  const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

  await fs.promises.writeFile(uploadPath, buffer);

  return `/uploads/${fileName}`;
};

const saveUploadedFiles = async (files) => {
  const uploaded = [];

  for (const file of files) {
    const savedPath = await saveUploadedFile(file);
    if (savedPath) {
      uploaded.push(savedPath);
    }
  }

  return uploaded;
};

const getCategoryDetails = async (categoryId, fallbackTitle) => {
  if (!categoryId) {
    return {
      categoryId: null,
      category: String(fallbackTitle || "").trim(),
    };
  }

  const category = await ProductCategory.findById(categoryId).lean();
  if (!category) {
    return {
      categoryId: null,
      category: String(fallbackTitle || "").trim(),
    };
  }

  return {
    categoryId: category._id,
    category: category.title,
  };
};

const buildProductPayload = async (formData, existing = {}) => {
  const title = String(formData.get("title") || "").trim();
  const slug = slugify(formData.get("slug") || title);
  const slugPath = normalizeSlugPath(formData.get("slugPath") || slug);
  const description = String(formData.get("description") || "").trim();
  const status = formData.get("status") === "Inactive" ? "Inactive" : "Active";
  const menuTitle = String(formData.get("menuTitle") || "").trim();
  const eyebrow = String(formData.get("eyebrow") || "Cleanroom Equipment").trim();
  const lead = String(formData.get("lead") || "").trim();
  const overviewTitle = String(formData.get("overviewTitle") || "").trim();
  const metaTitle = String(formData.get("metaTitle") || "").trim();
  const metaDescription = String(formData.get("metaDescription") || "").trim();
  const showInMenu = formData.get("showInMenu") !== "false";
  const order = Number.isFinite(Number(formData.get("order")))
    ? Number(formData.get("order"))
    : 0;

  const existingHeroImage = String(formData.get("existingHeroImage") || existing.heroImage || "");
  const existingImages = parseJson(
    formData.get("existingImages"),
    Array.isArray(existing.images) ? existing.images : []
  );

  const uploadedHeroImage = await saveUploadedFile(formData.get("heroImage"));
  const uploadedImages = await saveUploadedFiles(formData.getAll("images"));

  const { categoryId, category } = await getCategoryDetails(
    formData.get("categoryId"),
    formData.get("category")
  );

  const images = [...existingImages, ...uploadedImages];
  const heroImage = uploadedHeroImage || existingHeroImage || images[0] || "";

  return {
    title,
    slug,
    slugPath,
    categoryId,
    category,
    description,
    menuTitle,
    heroImage,
    images,
    eyebrow,
    lead,
    overviewTitle,
    overviewParagraphs: cleanStringList(formData.get("overviewParagraphs")),
    specifications: cleanSpecifications(formData.get("specifications")),
    features: cleanStringList(formData.get("features")),
    applications: cleanStringList(formData.get("applications")),
    metaTitle,
    metaDescription,
    order,
    showInMenu,
    status,
  };
};

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const payload = await buildProductPayload(formData);

    if (!payload.title || !payload.slug || !payload.slugPath || !payload.category || !payload.description) {
      return Response.json(
        {
          success: false,
          message: "Title, slug, slug path, category, and description are required",
        },
        { status: 400 }
      );
    }

    const product = await Product.create(payload);

    return Response.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("PRODUCT POST ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to create product",
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const product = await Product.findById(id).lean();

      if (!product) {
        return Response.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }

      return Response.json({
        success: true,
        data: product,
      });
    }

    const data = await Product.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("PRODUCT GET ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to fetch products",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();
    await Product.findByIdAndDelete(id);

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error("PRODUCT DELETE ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to delete product",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = String(formData.get("id") || "");
    const existing = await Product.findById(id).lean();

    if (!existing) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const payload = await buildProductPayload(formData, existing);

    if (!payload.title || !payload.slug || !payload.slugPath || !payload.category || !payload.description) {
      return Response.json(
        {
          success: false,
          message: "Title, slug, slug path, category, and description are required",
        },
        { status: 400 }
      );
    }

    const updated = await Product.findByIdAndUpdate(id, payload, { new: true });

    return Response.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error("PRODUCT PUT ERROR:", err);

    return Response.json(
      {
        success: false,
        message: "Unable to update product",
      },
      { status: 500 }
    );
  }
}
