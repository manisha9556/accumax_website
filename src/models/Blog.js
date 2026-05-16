import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "BlogCategory",
  required: true,
},

//    category: {
//   type: String,
//   required: true,
// },

    description: { type: String, required: true },

    images: [String], // multiple images

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);