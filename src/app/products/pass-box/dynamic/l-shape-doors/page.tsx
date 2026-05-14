import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';
import styles from '../../page.module.css';

export const metadata: Metadata = {
    title: 'Dyna Pass Box L-Shape Doors | Accumax India',
    description:
        'Dyna Pass Box systems by Accumax India designed for material transfer in cleanroom environments.',
};

const specifications = [
    {
        label: 'Body Material',
        value:
            'Stainless Steel 304 / Stainless Steel 316 / Powder Coated GI',
    },
    {
        label: 'Door Type',
        value:
            'Interlocked Doors with Magnetic Locking',
    },
    {
        label: 'Construction',
        value:
            'Double Wall Construction',
    },
    {
        label: 'Viewing Panel',
        value:
            'Transparent Toughened Glass',
    },
    {
        label: 'UV Light',
        value:
            'Optional UV Germicidal Light',
    },
    {
        label: 'Operation',
        value:
            'Manual / Automatic',
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
    {
        label: 'Applications',
        value:
            'Pharmaceutical, Electronics, Laboratories, Food Industries',
    },
];

const features = [
    'Smooth contamination-free material transfer',
    'Magnetic door interlocking system',
    'Heavy-duty stainless steel construction',
    'Easy cleaning and maintenance',
    'Corrosion resistant body',
    'Optional UV sterilization system',
];

const applications = [
    'Pharmaceutical cleanrooms',
    'Research laboratories',
    'Electronics manufacturing',
    'Food processing industries',
    'Biotechnology facilities',
    'Sterile production environments',
];

export default function DynamicLShapeDoor() {
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
                                src="/assets/products/LShape.jpeg"
                                alt="Dynamic Pass Box L-Shape Doors"
                                className={styles.heroImage}
                            />
                        </div>

                        <div className={styles.heroContent}>

                            <div className={styles.eyebrow}>
                                Cleanroom Equipment
                            </div>

                            <h1 className={styles.title}>
                                Dyna Pass Box
                            </h1>

                            <p className={styles.lead}>
                                Dyna Pass Boxes are specially designed for safe and efficient
                                material transfer between controlled cleanroom environments
                                without allowing contaminants to enter the clean area.
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
                                Reliable contamination control solution
                            </h2>
                        </div>

                        <p className={styles.description}>
                            Accumax India Dyna Pass Boxes are manufactured using premium
                            quality stainless steel and advanced engineering standards to
                            ensure safe material transfer between cleanroom zones.
                        </p>

                        <p className={styles.description}>
                            These pass boxes help minimize operator movement and significantly
                            reduce the risk of airborne contamination in pharmaceutical,
                            biotechnology, electronics, and laboratory environments.
                        </p>

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
              Reliable contamination control solution
            </h2>

          </div>

          <p className={styles.description}>
            Accumax India Dyna Pass Boxes are manufactured using premium
            quality stainless steel and advanced engineering standards to
            ensure safe material transfer between cleanroom zones.
          </p>

          <p className={styles.description}>
            These pass boxes help minimize operator movement and significantly
            reduce the risk of airborne contamination in pharmaceutical,
            biotechnology, electronics, and laboratory environments.
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