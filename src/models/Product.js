import mongoose from "mongoose";

const ProductSpecSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: "",
    },
    value: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    slugPath: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    category: {
      type: String,
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      default: null,
    },

    description: {
      type: String,
      required: true,
    },

    menuTitle: {
      type: String,
      trim: true,
      default: "",
    },

    heroImage: {
      type: String,
      default: "",
    },

    images: [String],

    eyebrow: {
      type: String,
      trim: true,
      default: "Cleanroom Equipment",
    },

    lead: {
      type: String,
      trim: true,
      default: "",
    },

    overviewTitle: {
      type: String,
      trim: true,
      default: "",
    },

    overviewParagraphs: [String],

    specifications: [ProductSpecSchema],

    features: [String],

    applications: [String],

    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },

    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    showInMenu: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
