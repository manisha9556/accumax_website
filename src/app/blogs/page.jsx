'use client';

import { useEffect, useState, useMemo } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';

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

  // FETCH BLOGS
  useEffect(() => {

    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {

        setBlogs(data.data || []);
        setLoading(false);

      });

  }, []);

  // FORM CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // SEND ENQUIRY
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

  // FILTER BLOGS
  const filteredBlogs = useMemo(() => {

    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  }, [blogs, searchQuery]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredBlogs.length / ITEMS_PER_PAGE
  );

  const paginatedBlogs = useMemo(() => {

    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredBlogs.slice(
      start,
      start + ITEMS_PER_PAGE
    );

  }, [filteredBlogs, currentPage]);

  // RECENT BLOGS
  const recentBlogs = useMemo(() => {

    return [...blogs].slice(0, 5);

  }, [blogs]);

  return (

    <>

      <Header />

      <div className={styles.pageWrapper}>

        {/* LEFT CONTENT */}
        <div className={styles.mainContent}>

          <h1 className={styles.title}>
            Our Latest Blogs
          </h1>

          <div className={styles.grid}>

            {loading ? (

              Array.from({ length: 6 }).map((_, i) => (
                <BlogSkeleton key={i} />
              ))

            ) : (

              paginatedBlogs.map(blog => (

                <BlogCard
                  key={blog._id}
                  blog={blog}
                />

              ))

            )}

          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>

          {/* SEARCH */}
          <div className={styles.sidebarBox}>

            <h3>Search</h3>

            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />

          </div>

          {/* RECENT BLOGS */}
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

          {/* CONTACT FORM */}
          <div className={styles.sidebarBox}>

            <h3>Contact Us</h3>

            {success ? (

              <div className={styles.successBox}>

                <h4>
                  ✅ Enquiry Submitted!
                </h4>

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
                  type="submit"
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

      <Footer />

      <ChatWidget />

    </>

  );
}