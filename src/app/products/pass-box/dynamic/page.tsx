import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Dynamic Pass Box | Accumax India',
  description:
    'Dynamic Pass Box systems by Accumax India designed for contamination-controlled material transfer in cleanroom environments.',
};

const specifications = [
  {
    label: 'Body Material',
    value:
      'Stainless Steel 304 / Stainless Steel 316 / Powder Coated GI',
  },
  {
    label: 'Filtration',
    value:
      'HEPA Filter Efficiency 99.99% @ 0.3 Micron',
  },
  {
    label: 'Air Flow',
    value:
      'Vertical Laminar Air Flow',
  },
  {
    label: 'Motor Blower',
    value:
      'Dynamically Balanced Motor and Blower Assembly',
  },
  {
    label: 'Door Interlocking',
    value:
      'Electromagnetic Interlocking System',
  },
  {
    label: 'UV Light',
    value:
      'UV Germicidal Light',
  },
  {
    label: 'Pressure Gauge',
    value:
      'Magnehelic Differential Pressure Gauge',
  },
  {
    label: 'Operation',
    value:
      'Automatic / Manual',
  },
  {
    label: 'Power Supply',
    value:
      '220V AC Single Phase',
  },
  {
    label: 'Finish',
    value:
      'Matt / Mirror Finish',
  },
];

const features = [
  'HEPA filtered contamination-free transfer',
  'Vertical laminar airflow system',
  'Electromagnetic door interlocking',
  'Low noise and energy efficient operation',
  'UV sterilization provision',
  'Heavy-duty stainless steel construction',
];

const applications = [
  'Pharmaceutical cleanrooms',
  'Biotechnology industries',
  'Hospitals and laboratories',
  'Electronics manufacturing',
  'Food processing industries',
  'Sterile production areas',
];

export default function DynamicPassBoxPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.overlay} />

          <div className={styles.heroInner}>

            <div className={styles.imageWrap}>
              <img
                src="/assets/products/DynamicPassBox.jpeg"
                alt="Dynamic Pass Box"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Dynamic Pass Box
              </h1>

              <p className={styles.lead}>
                Dynamic Pass Boxes are specially designed with HEPA filtered
                laminar airflow systems to ensure contamination-free transfer
                of materials between controlled cleanroom environments.
              </p>

            </div>

          </div>
        </section>

        {/* DESCRIPTION */}
        <section className={styles.section}>
          <div className={styles.container}>

            <div className={styles.sectionHeader}>

              <div className={styles.sectionLabel}>
                Product Overview
              </div>

              <h2 className={styles.sectionTitle}>
                Advanced cleanroom transfer solution
              </h2>

            </div>

            <p className={styles.description}>
              Accumax India Dynamic Pass Boxes are engineered for highly
              controlled cleanroom applications where contamination-free
              material transfer is critical.
            </p>

            <p className={styles.description}>
              Equipped with HEPA filtration and vertical laminar airflow,
              these systems maintain positive pressure inside the chamber
              and significantly reduce airborne particle contamination during
              material transfer operations.
            </p>

          </div>
        </section>

        {/* SPECIFICATIONS */}
        <section className={styles.specSection}>
          <div className={styles.container}>

            <div className={styles.sectionHeader}>

              <div className={styles.sectionLabel}>
                Technical Details
              </div>

              <h2 className={styles.sectionTitle}>
                Product Specifications
              </h2>

            </div>

            <div className={styles.specCard}>

              {specifications.map((item) => (
                <div
                  key={item.label}
                  className={styles.specRow}
                >

                  <div className={styles.specLabel}>
                    {item.label}
                  </div>

                  <div className={styles.specValue}>
                    {item.value}
                  </div>

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* FEATURES + APPLICATIONS */}
        <section className={styles.gridSection}>
          <div className={styles.containerGrid}>

            {/* FEATURES */}
            <div className={styles.infoCard}>

              <div className={styles.cardLabel}>
                Features
              </div>

              <h3 className={styles.cardTitle}>
                Key Features
              </h3>

              <ul className={styles.list}>
                {features.map((feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>

            </div>

            {/* APPLICATIONS */}
            <div className={styles.infoCard}>

              <div className={styles.cardLabel}>
                Applications
              </div>

              <h3 className={styles.cardTitle}>
                Industry Applications
              </h3>

              <ul className={styles.list}>
                {applications.map((application) => (
                  <li key={application}>
                    {application}
                  </li>
                ))}
              </ul>

            </div>

          </div>
        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}