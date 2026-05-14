import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Straight Entry Air Shower | Accumax India',
  description:
    'Straight Entry Air Shower systems by Accumax India designed for cleanroom contamination control and personnel decontamination.',
};

const specifications = [
  {
    label: 'Dimensions',
    value:
      '900x1000x2000 mm (Inner Area), 1400x1075x2150 mm (Outer Area) or Customized',
  },
  {
    label: 'MOC',
    value:
      'Galvanized Iron Powder Coated / Stainless Steel 304',
  },
  {
    label: 'Blower Assembly',
    value:
      'Dynamically and Statically Balanced Motors and Blowers',
  },
  {
    label: 'Motor',
    value:
      'Make Eevaanji',
  },
  {
    label: 'Nozzles',
    value:
      'Made of Stainless Steel Rotating and Adjustable Fixed Either Side of Wall and Top Ceiling',
  },
  {
    label: 'Blower CFM',
    value:
      '25–30 Meters/Sec',
  },
  {
    label: 'Face Velocity',
    value:
      '20–22 Meters/Sec (3937–4330 FPM)',
  },
  {
    label: 'Air Flow',
    value:
      '20–22 Meters/Sec (3937–4330 FPM)',
  },
  {
    label: 'Class',
    value:
      '10000',
  },
  {
    label: 'Interlocking of Doors',
    value:
      'Interlocking Facility of Doors. One Door Locks Automatically When Other Is Opened With Electromagnetic Lock and Timer Setting',
  },
  {
    label: 'Flooring',
    value:
      'Stainless Steel / Perforated with Tray',
  },
  {
    label: 'Door',
    value:
      'Frame Made of Stainless Steel / Galvanized Iron Powder Coated Interlocking Facility with Half Toughened Glass',
  },
  {
    label: 'Handle / Hinge',
    value:
      'Make Harrison / Godrej or Equivalent',
  },
  {
    label: 'Light',
    value:
      'LED',
  },
  {
    label: 'Pre Filter',
    value:
      'Washable Pre Filter Down To 10 Microns, Particulate Efficiency 90% Duly Tested',
  },
  {
    label: 'HEPA Filters',
    value:
      '0.3 Microns Particulate of 99.97% Efficiency and DOP Tested, Aluminium Microfiber Glass Media Epoxy Sealed, Non Washable',
  },
  {
    label: 'Operations',
    value:
      'Automatic Actuation Operation and Adjustable Timer Through Microprocessor Based Controller',
  },
  {
    label: 'Noise Level',
    value:
      'Less Than 75 Db',
  },
  {
    label: 'Safety',
    value:
      'Emergency Switch in Chamber, Glass Breaking Hammer, Fire Extinguisher',
  },
  {
    label: 'Electric Supply',
    value:
      'Works on 440V AC or 3 Phase (To Specify)',
  },
];

const features = [
  'High efficiency HEPA filtration system',
  'Microprocessor based control panel',
  'Automatic sensor-based operation',
  'Stainless steel durable construction',
  'Low noise and energy efficient performance',
  'Emergency stop and safety interlocking',
];

const applications = [
  'Pharmaceutical industries',
  'Electronics manufacturing units',
  'Food processing facilities',
  'Research laboratories',
  'Biotechnology industries',
  'Cleanroom environments',
];

export default function StraightEntryPage() {
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
                src="/assets/products/straightEntry.jpeg"
                alt="Straight Entry Air Shower"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Straight Entry Air Shower
              </h1>

              <p className={styles.lead}>
                Straight Entry Air Shower systems are designed to minimize
                contamination by removing dust particles from personnel before
                entering cleanroom environments.
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
                      High-performance contamination control system
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Accumax India Straight Entry Air Shower units are engineered
                    with precision to maintain cleanroom integrity and reduce
                    contamination risks.
                  </p>

                  <p className={styles.description}>
                    Manufactured using premium grade stainless steel and advanced
                    HEPA filtration technology, our air shower systems deliver
                    reliable performance and long-term durability.
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

            {/* SIDEBAR */}
            <ProductSidebar />

          </div>

        </section>

      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}