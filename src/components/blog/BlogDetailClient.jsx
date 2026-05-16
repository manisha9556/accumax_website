'use client';

import { useState } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ChatWidget from "@/components/ChatWidget/ChatWidget";

import styles from "./Blog.module.css";

export default function BlogDetailClient({ blog }) {

  const [formLoading, setFormLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({

    user_name: '',
    company_name: '',
    phone: '',
    user_email: '',
    message: '',

  });

  // FORM CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // SUBMIT FORM
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

  return (

    <>

      <Header />

      <div className={styles.pageWrapper}>

        {/* LEFT CONTENT */}
        <div className={styles.mainContent}>

          <div
            style={{
              background: "#fff",
              borderRadius: "22px",
              padding: "40px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
            }}
          >

            {/* TITLE */}
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "800",
                marginBottom: "20px",
                color: "#0f172a",
              }}
            >
              {blog.title}
            </h1>

            {/* CATEGORY */}
            <div style={{ marginBottom: "30px" }}>

              <span
                style={{
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Category: {blog.category?.name || "Blog"}
              </span>

            </div>

            {/* IMAGES */}
            {blog.images?.length > 0 && (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  marginBottom: "35px",
                }}
              >

                {blog.images.map((img, i) => (

                  <div
                    key={i}
                    style={{
                      background: "#f8fafc",
                      padding: "20px",
                      borderRadius: "20px",
                      textAlign: "center",
                    }}
                  >

                    <img
                      src={img}
                      alt={blog.title}
                      style={{
                        width: "100%",
                        maxWidth: "650px",
                        maxHeight: "520px",
                        objectFit: "contain",
                        borderRadius: "14px",
                      }}
                    />

                  </div>

                ))}

              </div>

            )}

            {/* DESCRIPTION */}
            <div
              style={{
                fontSize: "18px",
                lineHeight: "2",
                color: "#334155",
              }}
            >
              {blog.description}
            </div>

          </div>

        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>

          {/* CATALOG */}
          <div className={styles.sidebarBox}>

            <h3>Catalogue 2026</h3>

            <img
              src="/assets/CatelogFrontPage.jpeg"
              alt="Catalogue"
              className={styles.catalogImg}
            />

            <p>
              Get complete product details
              in our latest catalogue.
            </p>

            <div className={styles.catalogBtns}>

              <a
                href="/assets/Accumax Brochure.pdf"
                target="_blank"
              >
                <button className={styles.viewBtn}>
                  View
                </button>
              </a>

              <a
                href="/assets/Accumax Brochure.pdf"
                download
              >
                <button className={styles.downloadBtn}>
                  Download
                </button>
              </a>

            </div>

          </div>

          {/* CONTACT FORM */}
          <div className={styles.sidebarBox}>

            <h3>Contact Us</h3>

            {success ? (

              <div className={styles.successBox}>

                <h4>
                  ✅ Enquiry Submitted!
                </h4>

                <p>
                  Thank you for contacting us.
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

      <Footer />

      <ChatWidget />

    </>

  );
}