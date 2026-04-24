import styles from './Features.module.css';

const features = [
  {
    icon: '🔬',
    title: 'High Quality & Perfection',
    description:
      'Our team of experienced and highly skilled engineers employs state-of-art technology to build highly advanced and sophisticated instruments.',
  },
  {
    icon: '🏭',
    title: 'Cost Benefit',
    description:
      'All products are manufactured across our 2 factories in Delhi-NCR, standardized using CNC machines to provide long-term cost benefits.',
  },
  {
    icon: '⏳',
    title: 'Expertise & Adaptability',
    description:
      '25+ years of experience in providing cutting-edge testing and laboratory solutions to clients worldwide.',
  },
  {
    icon: '🤝',
    title: 'Highly Motivated Team',
    description:
      'More than 130 dedicated team members delivering exceptional services throughout India and across the globe.',
  },
];

export default function Features() {
  return (
    <section className={styles.features} id="about">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Why Choose Us</div>
        <h2 className={styles.sectionTitle}>
          Excellence Built Into Every Instrument
        </h2>
        <p className={styles.sectionSub}>
          Accumax India has emerged from decades of experimentation and simulation to become a world-class scientific equipment manufacturer.
        </p>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
