import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Static Garment Storage Cabinet | Accumax India',
  description:
    'Cleanroom Garment Storage Cabinet manufactured by Accumax India for contamination-free garment storage.',
};

const specifications = [
  {
    label: 'MOC',
    value:
      'Stainless Steel 304 Grade or Galvanized Powder Coated',
  },
  {
    label: 'Outer Dimensions',
    value:
      'WxDxH 1300x600x2400 mm or Customized',
  },
  {
    label: 'Utility',
    value:
      'For Keeping Folded And Hanging Garments',
  },
  {
    label: 'Cabinet Top',
    value:
      'Houses Easy-Access HEPA Filter/Blower Unit To Remove 99.99% Of All Contaminants 0.3 Microns & Larger',
  },
  {
    label: 'Air Flow',
    value:
      'Laminar',
  },
  {
    label: 'Illumination',
    value:
      'LED',
  },
  {
    label: 'Germicidal Activity',
    value:
      'UV Tube',
  },
  {
    label: 'Air Pressure',
    value:
      'Static Manometer / Magnahelic Gauge',
  },
  {
    label: 'Stand',
    value:
      'Levelling Screw',
  },
  {
    label: 'Electric',
    value:
      'Work On 220V AC 1 Phase',
  },
];

const features = [
  'Blower assembly fitted in all standard models',
  'Pre-filter and HEPA filter system',
  'LED light and UV light provision',
  'Low power consumption',
  'User-friendly operation',
  'UV light with hour meter',
  'Castor wheels for easy movement',
];

const applications = [
  'Hospitals and medical centres',
  'Pharmaceutical cleanrooms',
  'Food processing industry',
  'Optical industry',
  'Nuclear industry',
  'Aerospace industry',
  'Biotechnology laboratories',
  'Sterile garment storage areas',
];

export default function StaticGarmentStoragePage() {

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
                src="/assets/products/Static_garment_cabinet_storage.jpeg"
                alt="Static Garment Storage Cabinet"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Static Garment Storage Cabinet
              </h1>

              <p className={styles.lead}>
                Cleanroom Garment Storage Cabinets are designed for
                contamination-free storage of garments used inside
                controlled cleanroom environments.
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
                      Cleanroom Garment Storage Cabinet
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Accumax India is a leading manufacturer and supplier
                    of Garment Storage Cabinets used for keeping garments
                    in a contamination-free manner. These cabinets ensure
                    garments remain free from bacterial contamination and
                    maintain cleanroom integrity.
                  </p>

                  <p className={styles.description}>
                    These specially designed cabinets are widely used in
                    hospitals, pharmaceutical facilities, medical centres,
                    food processing industries, aerospace, optical, and
                    nuclear industries for safe garment storage.
                  </p>

                  <p className={styles.description}>
                    Accumax India is an ISO 9001:2008 Certified company
                    offering garment storage cabinets in modern designs
                    and customized sizes according to industrial
                    requirements.
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