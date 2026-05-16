import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Horizontal Laminar Air Flow Cabinet | Accumax India',
  description:
    'Horizontal Laminar Air Flow Cabinet manufactured by Accumax India for contamination-free cleanroom environments.',
};

const specifications = [
  {
    label: 'MOC Cabinet',
    value:
      'Wooden Laminated / Mild Steel Powder Coated / Stainless Steel',
  },
  {
    label: 'Main Filter',
    value:
      'HEPA Filter (99.97% Efficient At 0.3 Micron Particles)',
  },
  {
    label: 'Pre Filter',
    value:
      'Washable Synthetic Pre-Filter',
  },
  {
    label: 'Sterilization',
    value:
      'UV Germicidal Tube',
  },
  {
    label: 'Illumination',
    value:
      'Fluorescent Tube',
  },
  {
    label: 'Front Door',
    value:
      'Sliding Door Plexiglass',
  },
  {
    label: 'Manometer',
    value:
      'Analogue Type',
  },
  {
    label: 'Working Bench Size',
    value:
      '600x600x600mm, 900x600x600mm, 1200x600x600mm, 1800x600x600mm',
  },
  {
    label: 'HEPA Filter',
    value:
      '1 / 2 HEPA Filters',
  },
  {
    label: 'Electric Supply',
    value:
      'AC 230V, 50/60Hz',
  },
];

const features = [
  'Horizontal laminar clean airflow',
  'High efficiency HEPA filtration',
  'Low noise motor blower assembly',
  'UV germicidal tube support',
  'Contamination-free sterile workspace',
  'Durable stainless steel construction',
  'Easy maintenance and cleaning',
];

const applications = [
  'Pharmaceutical laboratories',
  'Microbiology research labs',
  'Electronics assembly',
  'Medical research centres',
  'Food processing industry',
  'Biotechnology facilities',
  'Cleanroom environments',
];

export default function HorizontalLaminarPage() {

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
                src="/assets/products/horizontal_laminar_air_flow.jpeg"
                alt="Horizontal Laminar Air Flow Cabinet"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Horizontal Laminar Air Flow Cabinet
              </h1>

              <p className={styles.lead}>
                Horizontal Laminar Air Flow Cabinets are designed
                to provide sterile particle-free airflow for
                laboratories and cleanroom environments.
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
                      Horizontal Laminar Air Flow System
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Horizontal Laminar Air Flow Cabinets are specially
                    engineered to create contamination-free working
                    environments using highly efficient HEPA filtered
                    horizontal airflow systems.
                  </p>

                  <p className={styles.description}>
                    These cabinets maintain sterile airflow across the
                    working area and protect sensitive samples and
                    laboratory processes from airborne contamination.
                  </p>

                  <p className={styles.description}>
                    Accumax India Horizontal Laminar Air Flow systems
                    are widely used in pharmaceutical industries,
                    microbiology laboratories, biotechnology facilities,
                    electronics manufacturing, and research centres.
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