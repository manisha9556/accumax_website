import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Cross Over Bench | Accumax India',
  description:
    'Cross Over Bench manufactured by Accumax India for cleanroom contamination control and personnel changeover areas.',
};

const specifications = [
  {
    label: 'Construction',
    value:
      'Stainless Steel 304 / Stainless Steel 316',
  },
  {
    label: 'Finish',
    value:
      'Matt / Mirror Finish',
  },
  {
    label: 'Bench Type',
    value:
      'Seating With Shoe Change Partition',
  },
  {
    label: 'Design',
    value:
      'Cleanroom Compatible Hygienic Design',
  },
  {
    label: 'Load Capacity',
    value:
      'Heavy Duty Industrial Structure',
  },
  {
    label: 'Cleaning',
    value:
      'Easy To Clean Smooth Surface',
  },
  {
    label: 'Applications',
    value:
      'Cleanrooms / Pharmaceutical / Food Industries',
  },
  {
    label: 'Customization',
    value:
      'Available In Custom Sizes',
  },
];

const features = [
  'Cleanroom compatible hygienic structure',
  'Heavy duty stainless steel construction',
  'Easy cleaning and maintenance',
  'Smooth contamination-free surface finish',
  'Strong partition design for personnel crossover',
  'Corrosion resistant body',
  'Custom size options available',
];

const applications = [
  'Pharmaceutical cleanrooms',
  'Food processing industries',
  'Biotechnology facilities',
  'Research laboratories',
  'Electronics manufacturing',
  'Hospitals and medical centres',
  'Controlled contamination zones',
];

export default function CrossOverBenchPage() {

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
                src="/assets/products/cross_over_bench.jpeg"
                alt="Cross Over Bench"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Cross Over Bench
              </h1>

              <p className={styles.lead}>
                Cross Over Benches are designed for cleanroom
                personnel changeover areas to minimize
                contamination transfer between controlled
                and uncontrolled zones.
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
                      Cleanroom Cross Over Bench System
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Accumax India Cross Over Benches are specially
                    designed for cleanroom changeover areas where
                    personnel move between different contamination
                    zones while changing footwear and garments.
                  </p>

                  <p className={styles.description}>
                    These benches help maintain contamination control
                    standards by separating clean and non-clean areas
                    efficiently. The hygienic stainless steel design
                    ensures durability, easy cleaning, and long-term
                    performance in critical environments.
                  </p>

                  <p className={styles.description}>
                    Cross Over Benches are widely used in
                    pharmaceutical industries, hospitals,
                    biotechnology facilities, food industries,
                    and research laboratories where strict
                    cleanroom protocols are followed.
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