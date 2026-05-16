import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import { categories as defaultCategories } from "@/data/categories";
import { menuData } from "@/components/Navbar/MenuData";

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const titleize = (value) =>
  String(value || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

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

const buildChildrenTree = (category, products) => {
  const root = [];

  const ensureBranch = (items, segment, href) => {
    const formattedTitle = titleize(segment);
    let existing = items.find((item) => item.title === formattedTitle);

    if (!existing) {
      existing = {
        title: formattedTitle,
      };
      items.push(existing);
    }

    if (href && !existing.href) {
      existing.href = href;
    }

    if (!existing.children) {
      existing.children = [];
    }

    return existing;
  };

  for (const product of products) {
    const rawPath = String(product.slugPath || product.slug || "").trim();
    if (!rawPath) {
      continue;
    }

    const cleanPath = rawPath.replace(/^products\/?/, "");
    const segments = cleanPath.split("/").filter(Boolean);

    if (segments.length === 0) {
      continue;
    }

    const relativeSegments =
      segments[0] === category.slug ? segments.slice(1) : segments;

    if (relativeSegments.length === 0) {
      continue;
    }

    let level = root;

    relativeSegments.forEach((segment, index) => {
      const isLeaf = index === relativeSegments.length - 1;
      const href = isLeaf ? `/products/${cleanPath}` : "";
      const branch = ensureBranch(level, segment, href);

      if (isLeaf) {
        branch.title = product.menuTitle || titleize(segment);
        if (!branch.href) {
          branch.href = `/products/${cleanPath}`;
        }
      }

      level = branch.children || [];
    });
  }

  const sortItems = (items) =>
    items
      .map((item) => {
        const next = { ...item };
        if (next.children?.length) {
          next.children = sortItems(next.children);
        } else {
          delete next.children;
        }
        return next;
      })
      .sort((a, b) => a.title.localeCompare(b.title));

  return sortItems(root);
};

const buildMenuFromDatabase = (categories, products) =>
  categories
    .map((category) => {
      const categoryProducts = products.filter((product) => {
        const categoryIdMatch =
          product.categoryId && String(product.categoryId) === String(category._id);
        const categoryNameMatch = product.category === category.title;

        return categoryIdMatch || categoryNameMatch;
      });

      const categoryPathProduct = categoryProducts.find((product) => {
        const productPath = String(product.slugPath || product.slug || "");
        return productPath === category.slug;
      });

      const item = {
        title: category.title,
      };

      if (categoryPathProduct) {
        item.href = `/products/${categoryPathProduct.slugPath || categoryPathProduct.slug}`;
      }

      const children = buildChildrenTree(category, categoryProducts);
      if (children.length > 0) {
        item.children = children;
      }

      return item;
    })
    .filter((category) => category.href || category.children?.length);

export async function GET() {
  try {
    await connectDB();
    await seedDefaultCategories();

    const [categories, products] = await Promise.all([
      ProductCategory.find({ status: "Active" }).sort({ order: 1, title: 1 }).lean(),
      Product.find({
        status: "Active",
        showInMenu: true,
      })
        .sort({ order: 1, title: 1 })
        .lean(),
    ]);

    const data = buildMenuFromDatabase(categories, products);

    return Response.json({
      success: true,
      source: data.length > 0 ? "database" : "fallback",
      data: data.length > 0 ? data : menuData,
    });
  } catch (err) {
    console.error("PRODUCT MENU GET ERROR:", err);

    return Response.json(
      {
        success: true,
        source: "fallback",
        data: menuData,
      },
      { status: 200 }
    );
  }
}
