import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Reverse Laminar Air Flow Booth | Accumax India',
  description:
    'Reverse Laminar Air Flow Booth manufactured by Accumax India for contamination-free sampling and dispensing operations.',
};

const specifications = [
  {
    label: 'Construction',
    value:
      'Stainless Steel 304 / Powder Coated GI',
  },
  {
    label: 'HEPA Filter',
    value:
      '99.97% Efficiency Down To 0.3 Micron',
  },
  {
    label: 'Pre Filter',
    value:
      'Washable Synthetic Pre-Filter',
  },
  {
    label: 'Air Flow',
    value:
      'Reverse Vertical Laminar Air Flow',
  },
  {
    label: 'Motor Blower',
    value:
      'Heavy Duty Dynamic Balanced Blower',
  },
  {
    label: 'Illumination',
    value:
      'LED Light',
  },
  {
    label: 'Pressure Gauge',
    value:
      'Magnahelic Pressure Gauge',
  },
  {
    label: 'Noise Level',
    value:
      'Less Than 65 dB',
  },
  {
    label: 'Power Supply',
    value:
      '220V AC Single Phase',
  },
  {
    label: 'Optional',
    value:
      'UV Light / Differential Pressure Monitor',
  },
];

const features = [
  'Contamination-free sampling environment',
  'Reverse laminar airflow technology',
  'Heavy duty blower assembly',
  'Low noise operation',
  'High efficiency HEPA filtration',
  'Easy cleaning and maintenance',
  'Energy efficient system',
];

const applications = [
  'Pharmaceutical industries',
  'Sampling operations',
  'Dispensing processes',
  'Research laboratories',
  'Food processing industry',
  'Chemical industries',
  'Cleanroom environments',
];

export default function SamplingBoothPage() {

  return (

    <>
      <Header />

      <main className={styles.page}>

        {/* HERO SECTION */}
        <section className={styles.hero}>

          <div className={styles.overlay} />

          <div className={styles.heroInner}>

            <div className={styles.imageWrap}>

              <img
                src="/assets/products/SAMPLING_BOOTH.jpeg"
                alt="Reverse Laminar Air Flow Booth"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Reverse Laminar Air Flow Booth
              </h1>

              <p className={styles.lead}>
                Reverse Laminar Air Flow Booths are designed
                to provide contamination-free environments
                for sampling and dispensing operations in
                pharmaceutical and cleanroom industries.
              </p>

            </div>

          </div>

        </section>

        {/* CONTENT + SIDEBAR */}
        <section className={styles.contentSection}>

          <div className={styles.contentGrid}>

            {/* LEFT CONTENT */}
            <div className={styles.leftContent}>

              {/* DESCRIPTION */}
              <section className={styles.section}>

                <div className={styles.container}>

                  <div className={styles.sectionHeader}>

                    <div className={styles.sectionLabel}>
                      Product Overview
                    </div>

                    <h2 className={styles.sectionTitle}>
                      Sampling / Dispensing Booth System
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Accumax India Reverse Laminar Air Flow Booths are
                    specially designed to provide contamination-free
                    environments during sampling and dispensing
                    operations in pharmaceutical and industrial
                    cleanroom applications.
                  </p>

                  <p className={styles.description}>
                    The system uses reverse vertical laminar airflow
                    technology with HEPA filtration to remove airborne
                    particles and maintain a safe and sterile working
                    area for operators and products.
                  </p>

                  <p className={styles.description}>
                    These booths are widely used in pharmaceutical,
                    food, chemical, and biotechnology industries where
                    contamination control and operator protection are
                    essential.
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

            </div>

            {/* RIGHT SIDEBAR */}
            <ProductSidebar />

          </div>

        </section>

      </main>

      <Footer />
      <ChatWidget />

    </>
  );
}