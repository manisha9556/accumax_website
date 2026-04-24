const testimonials = [
  {
    text: "It is admirable how quickly you respond to consumer inquiries, and your business practices are a prime example of a customer-driven strategy. We appreciate your wonderful and ongoing assistance. We strongly advise people in the industry to use your products and services.",
    name: "Client — Pharmaceutical Industry",
    initials: "PI",
  },
  {
    text: "Thanks for your Service and Support in completing the installation and training at our Facility. This marks a key role of Accumax India in our Facility at Manesar which is operationalized. Hope Accumax India will continue good & immediate services.",
    name: "Client — Industrial Facility, Manesar",
    initials: "IF",
  },
  {
    text: "A representative from Accumax India regularly visits our plant ensuring all instruments are operational. His training sessions and frequent visits enable us to keep equipment in optimal working order and give proper results.",
    name: "Client — Manufacturing Plant",
    initials: "MP",
  },
];

import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Client Feedback</div>
        <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.quote}>&ldquo;</div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <span className={styles.name}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
