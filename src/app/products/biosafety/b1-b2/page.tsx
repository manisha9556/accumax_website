import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Biosafety Cabinet Class II Type B1/B2 | Accumax India',
  description:
    'Biosafety Cabinet Class II Type B1/B2 manufactured by Accumax India for advanced contamination control and laboratory safety.',
};

const specifications = [
  {
    label: 'Cabinet Construction',
    value:
      'Stainless Steel 304 Interior With Powder Coated Exterior',
  },
  {
    label: 'HEPA Filter',
    value:
      '99.97% Efficiency At 0.3 Micron',
  },
  {
    label: 'Airflow System',
    value:
      'Vertical Laminar Downflow With Exhaust System',
  },
  {
    label: 'Exhaust',
    value:
      'Dedicated Exhaust Air System',
  },
  {
    label: 'Front Access',
    value:
      'Motorized Toughened Glass Sash',
  },
  {
    label: 'Noise Level',
    value:
      'Less Than 65 dB',
  },
  {
    label: 'Illumination',
    value:
      'LED Lighting',
  },
  {
    label: 'UV Light',
    value:
      'UV Germicidal Lamp',
  },
  {
    label: 'Control System',
    value:
      'Digital Safety Alarm And Monitoring',
  },
  {
    label: 'Power Supply',
    value:
      '220V AC Single Phase',
  },
];

const features = [
  'Advanced biosafety protection system',
  'Dedicated exhaust airflow technology',
  'High efficiency HEPA filtration',
  'Digital airflow monitoring system',
  'Low noise laboratory operation',
  'UV germicidal sterilization',
  'Enhanced operator and environmental protection',
];

const applications = [
  'Microbiology laboratories',
  'Pharmaceutical research',
  'Biotechnology industries',
  'Clinical laboratories',
  'Medical research centres',
  'Pathology laboratories',
  'Advanced biological testing environments',
];

export default function BiosafetyCabinetB1B2Page() {

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
                src="/assets/products/biosafteyCabinetB1_B2.jpeg"
                alt="Biosafety Cabinet Class II Type B1/B2"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Biosafety Cabinet Class II Type B1/B2
              </h1>

              <p className={styles.lead}>
                Biosafety Cabinet Class II Type B1/B2 systems
                are engineered for superior biological safety,
                contamination control, and laboratory protection
                in critical research environments.
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
                      Biosafety Cabinet Class II Type B1/B2
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Accumax India Biosafety Cabinets Class II
                    Type B1/B2 are designed for handling hazardous
                    biological agents and sensitive laboratory
                    operations requiring advanced contamination
                    control systems.
                  </p>

                  <p className={styles.description}>
                    These cabinets use vertical laminar airflow
                    combined with dedicated exhaust systems and
                    HEPA filtration technology to ensure operator,
                    product, and environmental protection during
                    laboratory processes.
                  </p>

                  <p className={styles.description}>
                    Biosafety Cabinets Class II Type B1/B2 are
                    widely used in microbiology laboratories,
                    pharmaceutical industries, biotechnology
                    research centres, pathology labs, and
                    medical testing facilities.
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