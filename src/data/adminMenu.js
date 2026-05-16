import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaBlog,
  FaCogs,
} from "react-icons/fa";
export const adminMenu = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: FaTachometerAlt,
  },

  {
    title: "Category Management",
    icon: FaBox,
    children: [
      { title: "Product Categories", path: "/admin/product-category" },
      { title: "Manage Products", path: "/admin/products" }
    ]
  },

  {
    title: "Manage Clients",
    path: "/admin/clients",
    icon: FaUsers,
  },

  {
    title: "Blogs Management",
    icon: FaBlog,
    children: [
      { title: "Manage Blog Category", path: "/admin/blog-category" },
      { title: "Manage Blogs", path: "/admin/blogs" }
    ]
  },

  {
    title: "Other Management",
    icon: FaCogs,
    children: [
      { title: "Static Pages", path: "/admin/pages" },
      { title: "Contact Enquiries", path: "/admin/contact-enquiry" },
      { title: "Product Enquiries", path: "/admin/product-enquiry" },
      { title: "Header Images", path: "/admin/header" },
      { title: "Testimonials", path: "/admin/testimonials" },
      { title: "FAQs", path: "/admin/faqs" },
      { title: "Gallery", path: "/admin/gallery" },
      { title: "Meta Tags", path: "/admin/meta" },
      { title: "Admin Settings", path: "/admin/settings" },
      { title: "Change Password", path: "/admin/password" },
      { title: "Logout", path: "/logout" }
    ]
  }
];
