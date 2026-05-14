import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export default async function BlogDetail({ params }) {

  // ✅ NEXT JS FIX
  const { id } = await params;

  await connectDB();

  // ✅ INVALID ID CHECK
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <h1 style={{ padding: "40px" }}>
        Invalid Blog ID
      </h1>
    );
  }

  let blog;

  try {

    // ❌ REMOVE populate
    blog = await Blog.findById(id);

  } catch (err) {

    console.error(err);

    return (
      <h1 style={{ padding: "40px" }}>
        Error loading blog
      </h1>
    );
  }

  if (!blog) {
    return (
      <h1 style={{ padding: "40px" }}>
        Blog not found
      </h1>
    );
  }

  return (

    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "40px 20px",
      }}
    >

      {/* TITLE */}
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "15px",
          color: "#111827",
        }}
      >
        {blog.title}
      </h1>

      {/* CATEGORY */}
      <p
        style={{
          color: "#2563eb",
          fontSize: "15px",
          fontWeight: "600",
          marginBottom: "25px",
        }}
      >
        Category: {blog.category}
      </p>

      {/* IMAGES */}
      {blog.images?.length > 0 && (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            marginBottom: "30px",
          }}
        >

          {blog.images.map((img, i) => (

            <img
              key={i}
              src={img}
              alt={blog.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "14px",
                objectFit: "contain",
                background: "#f3f4f6",
              }}
            />

          ))}

        </div>
      )}

      {/* DESCRIPTION */}
      <div
        style={{
          fontSize: "18px",
          lineHeight: "1.9",
          color: "#374151",
        }}
      >
        {blog.description}
      </div>

    </div>
  );
}







