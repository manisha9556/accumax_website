'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './EnquiryModal.module.css';

export default function EnquiryModal() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
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
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("Frontend Response:", result); // 👈 debug

      if (result.success) {
        setSuccess(true);
        form.current.reset();

        setTimeout(() => {
          setShow(false);
          setSuccess(false);
        }, 3000);
      }

      setLoading(false);
    } catch (error) {
      console.error("Frontend Error:", error);
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <button className={styles.close} onClick={() => setShow(false)}>×</button>

        <h2 className={styles.heading}>
          ACCUMAX <span>INDIA</span>
        </h2>

        <div className={styles.line}></div>

        {success ? (
          <div className={styles.successBox}>
            <h3>✅ Enquiry Submitted!</h3>
            <p>Thank you for contacting us. Our team will get back to you shortly.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail} className={styles.form}>

            <div className={styles.row}>
              <input name="user_name" placeholder="Your Full Name*" required />
              <input name="company_name" placeholder="Company Name*" required />
            </div>

            <div className={styles.row}>
              <input name="phone" placeholder="Phone Number*" required />
              <input
                name="user_email"
                type="email"
                placeholder="Email Address*"
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Required Product And Description*"
              rows={4}
              required
            />

            <button className={styles.btn} disabled={loading}>
              {loading ? 'Sending...' : 'SUBMIT YOUR ENQUIRY!'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}








// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import styles from './EnquiryModal.module.css';

// export default function EnquiryModal() {
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const form = useRef();

//   useEffect(() => {
//     const timer = setTimeout(() => setShow(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const sendEmail = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     emailjs
//       .sendForm(
//         'service_rbahmaj',
//         'template_e7s1eg4',
//         form.current,
//         'PwXr8Y5Qffgossjew'
//       )
//       .then(() => {
//         setLoading(false);
//         setSuccess(true);
//         form.current.reset();

//         setTimeout(() => {
//           setShow(false);
//           setSuccess(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//         alert('❌ Failed to send. Try again.');
//       });
//   };

//   if (!show) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>

//         <button className={styles.close} onClick={() => setShow(false)}>×</button>

//         <h2 className={styles.heading}>
//           ACCUMAX <span>INDIA</span>
//         </h2>

//         <div className={styles.line}></div>

//         {/* ✅ SUCCESS POPUP */}
//         {success ? (
//           <div className={styles.successBox}>
//             <h3>✅ Enquiry Submitted!</h3>
//             <p>Thank you for contacting us. Our team will get back to you shortly.</p>
//           </div>
//         ) : (
//           <form ref={form} onSubmit={sendEmail} className={styles.form}>

//             <div className={styles.row}>
//               <input name="user_name" placeholder="Your Full Name*" required />
//               <input name="company_name" placeholder="Company Name*" required />
//             </div>

//             <div className={styles.row}>
//               <input name="phone" placeholder="Phone Number*" required />
//               <input
//                 name="user_email"
//                 type="email"
//                 placeholder="Email Address*"
//                 required
//               />
//             </div>

//             <textarea
//               name="message"
//               placeholder="Required Product And Description*"
//               rows={4}
//               required
//             />

//             <button className={styles.btn} disabled={loading}>
//               {loading ? 'Sending...' : 'SUBMIT YOUR ENQUIRY!'}
//             </button>

//           </form>
//         )}

//       </div>
//     </div>
//   );
// }




