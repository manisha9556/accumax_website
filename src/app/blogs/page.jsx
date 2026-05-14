'use client';

import { useEffect, useState, useMemo } from 'react';
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import BlogSkeleton from "@/components/blog/BlogSkeleton";
import styles from "@/components/blog/Blog.module.css";

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const [formLoading, setFormLoading] = useState(false);
const [success, setSuccess] = useState(false);

const [formData, setFormData] = useState({

  user_name: '',
  company_name: '',
  phone: '',
  user_email: '',
  message: '',

});
  // 🔥 FETCH BLOGS
  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.data || []);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {

  setFormData({

    ...formData,

    [e.target.name]: e.target.value,

  });

};

const sendEnquiry = async (e) => {

  e.preventDefault();

 setFormLoading(true); 

  try {

    const res = await fetch('/api/enquiry', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData),

    });

    const result = await res.json();

    if (result.success) {

      setSuccess(true);

      setFormData({

        user_name: '',
        company_name: '',
        phone: '',
        user_email: '',
        message: '',

      });

      setTimeout(() => {

        setSuccess(false);

      }, 3000);

    }

  } catch (err) {

    console.error(err);

  } finally {
setFormLoading(false);
 }

};

  // 🔍 FILTER
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  // 🆕 RECENT BLOGS (latest 5)
  const recentBlogs = useMemo(() => {
    return [...blogs].slice(0, 5);
  }, [blogs]);

  return (
    <div className={styles.pageWrapper}>

      {/* LEFT: BLOG LIST */}
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Our Latest Blogs</h1>

        <div className={styles.grid}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
          ) : (
            paginatedBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* RIGHT: SIDEBAR */}
      <div className={styles.sidebar}>

        {/* 🔍 SEARCH */}
        <div className={styles.sidebarBox}>
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 🆕 RECENT BLOGS */}
        <div className={styles.sidebarBox}>
          <h3>Recent Blogs</h3>
          <ul className={styles.recentList}>
            {recentBlogs.map(item => (
              <li key={item._id}>
                <a href={`/blogs/${item._id}`}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 📥 DOWNLOAD CATALOG */}
       <div className={styles.sidebarBox}>
  <h3>Catalogue 2026</h3>

  {/* IMAGE */}
  <img
    src="/assets/CatelogFrontPage.jpeg"
    alt="Catalogue"
    className={styles.catalogImg}
  />

  <p>Get complete product details in our latest catalogue.</p>

  {/* BUTTONS */}
  <div className={styles.catalogBtns}>
    <a href="/assets/Accumax Brochure.pdf" target="_blank">
      <button className={styles.viewBtn}>View</button>
    </a>

    <a href="/assets/Accumax Brochure.pdf" download>
      <button className={styles.downloadBtn}>Download</button>
    </a>
  </div>
</div>
{/* 📞 CONTACT BOX */}
<div className={styles.sidebarBox}>

  <h3>Contact Us</h3>

  {success ? (

    <div className={styles.successBox}>

      <h4>
        ✅ Enquiry Submitted!
      </h4>

      <p>
        Thank you for contacting us.
        Our team will get back to you shortly.
      </p>

    </div>

  ) : (

    <form onSubmit={sendEnquiry}>

      <input
        name="user_name"
        placeholder="Name"
        className={styles.input}
        value={formData.user_name}
        onChange={handleChange}
        required
      />

      <input
        name="company_name"
        placeholder="Company Name"
        className={styles.input}
        value={formData.company_name}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        className={styles.input}
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        name="user_email"
        type="email"
        placeholder="Email"
        className={styles.input}
        value={formData.user_email}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Requirement"
        className={styles.textarea}
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button
        className={styles.submitBtn}
        disabled={formLoading}
      >

        {formLoading
  ? 'Submitting...'
  : 'Submit'}

      </button>

    </form>

  )}

</div>

      </div>
    </div>
  );
}



// 'use client';

// import { useEffect, useState, useMemo } from 'react';
// import BlogCard from "@/components/blog/BlogCard";
// import Pagination from "@/components/blog/Pagination";
// import BlogSkeleton from "@/components/blog/BlogSkeleton";
// import styles from "@/components/blog/Blog.module.css";


// const ITEMS_PER_PAGE = 5;

// export default function BlogPage() {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         fetch('/api/blog')
//             // .then(res => res.json())
//             .then(async (res) => {
//   if (!res.ok) throw new Error("API failed");
//   return res.json();
// })
//             .then(data => {
//                 setBlogs(data.data || []);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Failed to fetch blogs:", error);
//                 setLoading(false);
//             });
//     }, []);

//     // Extract unique categories for the filter
//     const categories = useMemo(() => {
//         const cats = new Set(
//             blogs.map(blog => blog.category?.name).filter(Boolean)
//         );
//         return Array.from(cats);
//     }, [blogs]);

//     // Filter blogs based on search query and category
//     const filteredBlogs = useMemo(() => {
//         return blogs.filter(blog => {
//             const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
//             const matchesCategory = selectedCategory ? blog.category?.name === selectedCategory : true;
//             return matchesSearch && matchesCategory;
//         });
//     }, [blogs, searchQuery, selectedCategory]);

//     // Pagination logic
//     const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    
//     // Reset to page 1 when filters change
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchQuery, selectedCategory]);

//     const paginatedBlogs = useMemo(() => {
//         const start = (currentPage - 1) * ITEMS_PER_PAGE;
//         const end = start + ITEMS_PER_PAGE;
//         return filteredBlogs.slice(start, end);
//     }, [filteredBlogs, currentPage]);

//     return (
//         <div className={styles.container}>
//             <div className={styles.header}>
//                 <h1 className={styles.title}>Our Latest Blogs</h1>
//                 <p>Stay updated with our newest articles and announcements.</p>
//             </div>

//             <div className={styles.controls}>
//                 <input 
//                     type="text" 
//                     placeholder="Search by title..." 
//                     className={styles.searchInput}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <select 
//                     className={styles.categorySelect}
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                     <option value="">All Categories</option>
//                     {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className={styles.grid}>
//                 {loading ? (
//                     // Show 6 skeletons while loading
//                     Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
//                 ) : paginatedBlogs.length > 0 ? (
//                     paginatedBlogs.map(blog => (
//                         <BlogCard key={blog._id} blog={blog} />
//                     ))
//                 ) : (
//                     <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
//                         <h3>No blogs found</h3>
//                         <p>Try adjusting your search or filters.</p>
//                     </div>
//                 )}
//             </div>

//             {!loading && filteredBlogs.length > 0 && (
//                 <Pagination 
//                     currentPage={currentPage} 
//                     totalPages={totalPages} 
//                     onPageChange={setCurrentPage} 
//                 />
//             )}
//         </div>
//     );
// }