import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import ProductSidebar from '@/components/ProductSidebar/ProductSidebar';
import styles from './ProductDetail.module.css';

export default function DynamicProductDetail({ product }) {
  const heroImage = product.heroImage || product.images?.[0] || '/assets/CatelogFrontPage.jpeg';
  const overviewTitle = product.overviewTitle || 'Reliable contamination control solution';
  const lead = product.lead || product.description;
  const overviewParagraphs =
    product.overviewParagraphs?.length > 0
      ? product.overviewParagraphs
      : product.description
        ? [product.description]
        : [];

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
                src={heroImage}
                alt={product.title}
                className={styles.heroImage}
              />
            </div>

            <div className={styles.heroContent}>

              <div className={styles.eyebrow}>
                {product.eyebrow || 'Cleanroom Equipment'}
              </div>

              <h1 className={styles.title}>
                {product.title}
              </h1>

              <p className={styles.lead}>
                {lead}
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
                      {overviewTitle}
                    </h2>

                  </div>

                  {overviewParagraphs.map((paragraph, index) => (
                    <p
                      key={`${product._id || product.slug}-overview-${index}`}
                      className={styles.description}
                    >
                      {paragraph}
                    </p>
                  ))}

                </div>

              </section>

              {/* SPECIFICATIONS */}
              {product.specifications?.length > 0 && (
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

                      {product.specifications.map((item) => (
                        <div
                          key={`${item.label}-${item.value}`}
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
              )}

              {/* FEATURES + APPLICATIONS */}
              {(product.features?.length > 0 || product.applications?.length > 0) && (
                <section className={styles.gridSection}>

                  <div className={styles.containerGrid}>

                    {/* FEATURES */}
                    {product.features?.length > 0 && (
                      <div className={styles.infoCard}>

                        <div className={styles.cardLabel}>
                          Features
                        </div>

                        <h3 className={styles.cardTitle}>
                          Key Features
                        </h3>

                        <ul className={styles.list}>
                          {product.features.map((feature) => (
                            <li key={feature}>
                              {feature}
                            </li>
                          ))}
                        </ul>

                      </div>
                    )}

                    {/* APPLICATIONS */}
                    {product.applications?.length > 0 && (
                      <div className={styles.infoCard}>

                        <div className={styles.cardLabel}>
                          Applications
                        </div>

                        <h3 className={styles.cardTitle}>
                          Industry Applications
                        </h3>

                        <ul className={styles.list}>
                          {product.applications.map((application) => (
                            <li key={application}>
                              {application}
                            </li>
                          ))}
                        </ul>

                      </div>
                    )}

                  </div>

                </section>
              )}

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
