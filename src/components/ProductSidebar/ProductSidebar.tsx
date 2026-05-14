'use client';

import { useRef, useState } from 'react';
import styles from './ProductSidebar.module.css';

export default function ProductSidebar() {

  const form = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const sendEnquiry = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!form.current) return;

    setLoading(true);

    const formData = new FormData(form.current);

    const data = {
      user_name: formData.get('user_name'),
      company_name: formData.get('company_name'),
      phone: formData.get('phone'),
      user_email: formData.get('user_email'),
      message: formData.get('message'),
    };

    try {

      const res = await fetch('/api/enquiry', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {

        setSuccess(true);

        form.current.reset();

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <aside className={styles.sidebar}>

      {/* CATALOGUE */}
      <div className={styles.sidebarBox}>

        <h3>
          Catalogue 2026
        </h3>

        <img
          src="/assets/CatelogFrontPage.jpeg"
          alt="Catalogue"
          className={styles.catalogImg}
        />

        <p>
          Download our latest cleanroom equipment catalogue.
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

      {/* ENQUIRY FORM */}
      <div className={styles.sidebarBox}>

        <h3>
          Contact Us
        </h3>

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

          <form
            ref={form}
            onSubmit={sendEnquiry}
          >

            <input
              name="user_name"
              placeholder="Your Name*"
              className={styles.input}
              required
            />

            <input
              name="company_name"
              placeholder="Company Name*"
              className={styles.input}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number*"
              className={styles.input}
              required
            />

            <input
              name="user_email"
              type="email"
              placeholder="Email Address*"
              className={styles.input}
              required
            />

            <textarea
              name="message"
              placeholder="Requirement Details*"
              className={styles.textarea}
              required
            />

            <button
              className={styles.submitBtn}
              disabled={loading}
            >

              {loading
                ? 'Submitting...'
                : 'Submit Enquiry'}

            </button>

          </form>

        )}

      </div>

    </aside>

  );
}