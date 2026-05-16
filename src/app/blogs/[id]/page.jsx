import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogCategory from "@/models/BlogCategory";
import mongoose from "mongoose";

import BlogDetailClient from "@/components/blog/BlogDetailClient";

export default async function BlogDetail({ params }) {

  const { id } = await params;

  await connectDB();

  // INVALID ID
  if (!mongoose.Types.ObjectId.isValid(id)) {

    return (
      <h1
        style={{
          padding: "180px 40px",
          textAlign: "center",
        }}
      >
        Invalid Blog ID
      </h1>
    );
  }

  let blog;

  try {

    blog = await Blog.findById(id)
      .populate("category");

  } catch (err) {

    console.error(err);

    return (
      <h1
        style={{
          padding: "180px 40px",
          textAlign: "center",
        }}
      >
        Error loading blog
      </h1>
    );
  }

  // BLOG NOT FOUND
  if (!blog) {

    return (
      <h1
        style={{
          padding: "180px 40px",
          textAlign: "center",
        }}
      >
        Blog not found
      </h1>
    );
  }

  // CONVERT MONGOOSE OBJECT
  const plainBlog = JSON.parse(JSON.stringify(blog));

  return (
    <BlogDetailClient blog={plainBlog} />
  );
}