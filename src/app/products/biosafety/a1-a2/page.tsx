import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Biosafety Cabinet Class II Type A1/A2 | Accumax India',
  description:
    'Biosafety Cabinet Class II Type A1/A2 manufactured by Accumax India for contamination-free laboratory environments.',
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
      '99.97% Efficient At 0.3 Micron',
  },
  {
    label: 'Airflow System',
    value:
      'Vertical Laminar Downflow',
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
      'LED Light',
  },
  {
    label: 'UV Light',
    value:
      'UV Germicidal Lamp',
  },
  {
    label: 'Control Panel',
    value:
      'Digital Display With Safety Alarm',
  },
  {
    label: 'Power Supply',
    value:
      '220V AC Single Phase',
  },
  {
    label: 'Applications',
    value:
      'Microbiology / Pharmaceutical / Biotechnology Labs',
  },
];

const features = [
  'High efficiency HEPA filtration system',
  'Personnel and product protection',
  'Low noise operation',
  'UV germicidal sterilization',
  'Digital safety control system',
  'Energy efficient airflow system',
  'Ergonomic laboratory design',
];

const applications = [
  'Microbiology laboratories',
  'Pharmaceutical industries',
  'Biotechnology research',
  'Medical research centres',
  'Pathology laboratories',
  'Clinical testing labs',
  'Cleanroom laboratory environments',
];

export default function BiosafetyCabinetA1A2Page() {

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
                src="/assets/products/biosafteyCabinetA1_A2.jpeg"
                alt="Biosafety Cabinet Class II Type A1/A2"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Biosafety Cabinet Class II Type A1/A2
              </h1>

              <p className={styles.lead}>
                Biosafety Cabinets are designed to provide
                personnel, product, and environmental protection
                during laboratory handling of sensitive biological
                materials and contaminants.
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
                      Biosafety Cabinet Class II Type A1/A2
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Accumax India Biosafety Cabinets Class II
                    Type A1/A2 are specially designed to provide
                    superior protection for laboratory personnel,
                    products, and the environment during biological
                    research and testing operations.
                  </p>

                  <p className={styles.description}>
                    These cabinets utilize advanced HEPA filtration
                    systems and vertical laminar airflow technology
                    to maintain sterile working conditions and
                    prevent contamination during handling of
                    hazardous biological materials.
                  </p>

                  <p className={styles.description}>
                    Biosafety Cabinets are widely used in
                    microbiology laboratories, pharmaceutical
                    industries, biotechnology research centres,
                    hospitals, and pathology laboratories where
                    contamination control is critical.
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