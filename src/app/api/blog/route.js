import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory"; // ✅ FIX (VERY IMPORTANT)
import fs from "fs";
import path from "path";

// ➕ CREATE
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");
    const files = formData.getAll("images");

    if (!title || !category || !description) {
      return Response.json({ success: false, message: "All fields required" });
    }

    let imagePaths = [];

    for (const file of files) {
      if (file && file.name) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}_${file.name}`;
        const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

        await fs.promises.writeFile(uploadPath, buffer);

        imagePaths.push(`/uploads/${fileName}`);
      }
    }

    const blog = await Blog.create({
      title,
      category,
      description,
      images: imagePaths,
    });

    return Response.json({ success: true, data: blog });

  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({ success: false });
  }
}


// 📥 GET
export async function GET() {
  try {
    await connectDB();
    // const blogs = await Blog.find().sort({ createdAt: -1 });

    const blogs = await Blog.find()
      .populate("category") // ✅ now works
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: blogs,
    });

  } catch (err) {
    console.error("GET ERROR:", err);
    return Response.json({ success: false });
  }
}


// ❌ DELETE
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Blog.findByIdAndDelete(id);

    return Response.json({ success: true });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({ success: false });
  }
}


// 🔄 UPDATE
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id");
    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");
    const status = formData.get("status");

    const files = formData.getAll("images");

    let imagePaths = [];

    // 👉 अगर new images upload हुए हैं
    if (files && files.length > 0 && files[0].name) {
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}_${file.name}`;
        const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

        await fs.promises.writeFile(uploadPath, buffer);

        imagePaths.push(`/uploads/${fileName}`);
      }
    }

    // 👉 पुराना blog fetch
    const existingBlog = await Blog.findById(id);

    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        category,
        description,
        status,
        // 👉 अगर new image है तो replace करो, नहीं तो old रखो
        images: imagePaths.length > 0 ? imagePaths : existingBlog.images,
      },
      { new: true }
    );

    return Response.json({ success: true, data: updated });

  } catch (err) {
    console.error("PUT ERROR:", err);
    return Response.json({ success: false });
  }
}







// import { connectDB } from "@/lib/mongodb";
// import Blog from "@/models/Blog";
// import fs from "fs";
// import path from "path";

// // ➕ CREATE
// export async function POST(req) {
//   try {
//     await connectDB();

//     const formData = await req.formData();

//     const title = formData.get("title");
//     const category = formData.get("category");
//     const description = formData.get("description");
//     const files = formData.getAll("images");

//     if (!title || !category || !description) {
//       return Response.json({ success: false, message: "All fields required" });
//     }

//     let imagePaths = [];

//     for (const file of files) {
//       if (file && file.name) {
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const fileName = `${Date.now()}_${file.name}`;
//         const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

//         await fs.promises.writeFile(uploadPath, buffer);

//         imagePaths.push(`/uploads/${fileName}`);
//       }
//     }

//     const blog = await Blog.create({
//       title,
//       category,
//       description,
//       images: imagePaths,
//     });

//     return Response.json({ success: true, data: blog });

//   } catch (err) {
//     console.error(err);
//     return Response.json({ success: false, message: "Server error" });
//   }
// }


// // 📥 GET
// export async function GET() {
//   try {
//     await connectDB();

//     const blogs = await Blog.find()
//       .populate("category")
//       .sort({ createdAt: -1 });

//     return Response.json({ success: true, data: blogs });

//   } catch (err) {
//     console.error(err);
//     return Response.json({ success: false });
//   }
// }


// // ❌ DELETE
// export async function DELETE(req) {
//   try {
//     await connectDB();

//     const { id } = await req.json();

//     await Blog.findByIdAndDelete(id);

//     return Response.json({ success: true });

//   } catch {
//     return Response.json({ success: false });
//   }
// }

// export async function PUT(req) {
//   try {
//     await connectDB();

//     const { id, title, category, description, status } = await req.json();

//     const updated = await Blog.findByIdAndUpdate(
//       id,
//       { title, category, description, status },
//       { new: true }
//     );

//     return Response.json({ success: true, data: updated });

//   } catch (err) {
//     return Response.json({ success: false });
//   }
// }