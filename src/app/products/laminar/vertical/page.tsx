import type { Metadata } from 'next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';

import styles from '../page.module.css';

export const metadata: Metadata = {
  title: 'Vertical Laminar Air Flow Cabinet | Accumax India',
  description:
    'Vertical Laminar Air Flow Cabinet manufactured by Accumax India for contamination-free cleanroom environments.',
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
  'High efficiency HEPA filtration',
  'UV germicidal tube support',
  'Low noise motor blower assembly',
  'Transparent plexiglass side panels',
  'Contamination-free working area',
  'Durable stainless steel construction',
  'Class 100 clean air environment',
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

export default function VerticalLaminarPage() {

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
                src="/assets/products/vertical_laminar_air_flow.jpeg"
                alt="Vertical Laminar Air Flow Cabinet"
                className={styles.heroImage}
              />

            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                Cleanroom Equipment
              </div>

              <h1 className={styles.title}>
                Vertical Laminar Air Flow Cabinet
              </h1>

              <p className={styles.lead}>
                Vertical Laminar Air Flow Cabinets are designed
                to provide contamination-free clean air for
                laboratories and controlled cleanroom applications.
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
                      Vertical Laminar Air Flow System
                    </h2>

                  </div>

                  <p className={styles.description}>
                    Vertical Laminar Air Flow Cabinets consist of
                    stainless steel cabinets, HEPA filters,
                    pre-filters, blower assemblies, UV lamps,
                    fluorescent lamps, and working stations that
                    together maintain sterile working conditions. 
                  </p>

                  <p className={styles.description}>
                    Air passes through highly efficient HEPA filters
                    and creates a continuous vertical laminar airflow
                    that removes airborne contaminants and protects
                    sensitive laboratory materials from contamination.
                  </p>

                  <p className={styles.description}>
                    These systems are widely used in pharmaceutical,
                    microbiology, biotechnology, electronics,
                    medical research, and cleanroom industries where
                    sterile environments are critical. 
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