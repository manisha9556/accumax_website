import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

import fs from "fs";
import path from "path";



// ➕ CREATE PRODUCT

export async function POST(req) {

  try {

    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");

    const slug = formData.get("slug");

    const category = formData.get("category");

    const description = formData.get("description");

    const files = formData.getAll("images");
    if (
  !title ||
  !slug ||
  !category ||
  !description
) {
  return Response.json({
    success: false,
    message: "All fields required"
  });
}

    let imagePaths = [];

    for (const file of files) {

      if (file && file.name) {

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const fileName =
          `${Date.now()}_${file.name}`;

        const uploadPath = path.join(
          process.cwd(),
          "public/uploads",
          fileName
        );

        await fs.promises.writeFile(
          uploadPath,
          buffer
        );

        imagePaths.push(
          `/uploads/${fileName}`
        );
      }
    }

    const product = await Product.create({

      title,
      slug,
      category,
      description,

      images: imagePaths,
    });

    return Response.json({
      success: true,
      data: product,
    });

  } catch (err) {

    console.log("POST ERROR:", err);

    return Response.json({
      success: false,
    });
  }
}



// 📥 GET PRODUCTS

export async function GET() {

  try {

    await connectDB();

    const data = await Product.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      data,
    });

  } catch (err) {

    console.log("GET ERROR:", err);

    return Response.json({
      success: false,
    });
  }
}



// ❌ DELETE PRODUCT

export async function DELETE(req) {

  try {

    await connectDB();

    const { id } = await req.json();

    await Product.findByIdAndDelete(id);

    return Response.json({
      success: true,
    });

  } catch (err) {

    console.log("DELETE ERROR:", err);

    return Response.json({
      success: false,
    });
  }
}



// ✏️ UPDATE PRODUCT

export async function PUT(req) {

  try {

    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id");

    const title = formData.get("title");

    const slug = formData.get("slug");

    const category = formData.get("category");

    const description = formData.get("description");

    const status = formData.get("status");

    const existingImages =
      JSON.parse(
        formData.get("existingImages")
      );

    const files = formData.getAll("images");



    // EXISTING IMAGES

    let imagePaths = [...existingImages];



    // NEW IMAGE UPLOAD

    for (const file of files) {

      if (file && file.name) {

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const fileName =
          `${Date.now()}_${file.name}`;

        const uploadPath = path.join(
          process.cwd(),
          "public/uploads",
          fileName
        );

        await fs.promises.writeFile(
          uploadPath,
          buffer
        );

        imagePaths.push(
          `/uploads/${fileName}`
        );
      }
    }



    // UPDATE DATABASE

    const updated =
      await Product.findByIdAndUpdate(

        id,

        {
          title,
          slug,
          category,
          description,
          status,

          images: imagePaths,
        },

        { new: true }
      );



    return Response.json({
      success: true,
      data: updated,
    });

  } catch (err) {

    console.log("PUT ERROR:", err);

    return Response.json({
      success: false,
    });
  }
}