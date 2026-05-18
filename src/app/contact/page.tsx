'use client';

import { useRef, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function ContactPage() {

  const form = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!form.current) return;

    const formData = new FormData(form.current);

    const data = {
      user_name: formData.get("user_name"),
      company_name: formData.get("company_name"),
      phone: formData.get("phone"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };

    try {

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1>Contact Accumax India</h1>

          <p>
            Get in touch with our experts for laboratory equipment,
            cleanroom solutions, air showers, biosafety cabinets,
            and industrial testing systems.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className={styles.contactSection}>

        {/* LEFT INFO */}
        <div className={styles.infoBox}>

          <h2>Let's Talk</h2>

          <p>
            We are here to help you with your industrial,
            laboratory, and cleanroom equipment requirements.
          </p>

          <div className={styles.infoItem}>
            <span>📞</span>
            <div>
              <h4>Phone</h4>
              <p>+91 83840 62994</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>accumax105@gmail.com</p>
            </div>
          </div>

          <div className={styles.infoItem}>
  <span>📍</span>
  <div>
    <h4>Address</h4>
    <p>
      105, Vishal Tower, District Center,<br />
      Janakpuri, New Delhi - 110058 (India)
    </p>
  </div>
</div>

          {/* BROCHURE */}
          <div className={styles.catalogBox}>

            <img
              src="/assets/CatelogFrontPage.jpeg"
              alt="Catalogue"
            />

            <a
              href="/assets/Accumax Brochure.pdf"
              download
            >
              Download Catalogue
            </a>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className={styles.formBox}>

          <h2>Send Enquiry</h2>

          {success ? (
            <div className={styles.successBox}>
              ✅ Enquiry submitted successfully!
            </div>
          ) : (

            <form
              ref={form}
              onSubmit={handleSubmit}
              className={styles.form}
            >

              <div className={styles.row}>
                <input
                  name="user_name"
                  placeholder="Your Full Name*"
                  required
                />

                <input
                  name="company_name"
                  placeholder="Company Name*"
                  required
                />
              </div>

              <div className={styles.row}>
                <input
                  name="phone"
                  placeholder="Phone Number*"
                  required
                />

                <input
                  name="user_email"
                  type="email"
                  placeholder="Email Address*"
                  required
                />
              </div>

              <textarea
                name="message"
                rows={6}
                placeholder="Required Product And Description*"
                required
              />

              <button
                type="submit"
                className={styles.submitBtn}
              >
                {loading ? 'Sending...' : 'SUBMIT ENQUIRY'}
              </button>

            </form>

          )}

        </div>

      </section>

      {/* GOOGLE MAP */}
      <section className={styles.mapSection}>

        <iframe
          src="https://www.google.com/maps?q=105,Vishal+Tower,District+Center,Janakpuri,New+Delhi+110058&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>

      </section>

    </main>
      <Footer />
    </>
  );
}