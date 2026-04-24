import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import AirShowerGallery from './AirShowerGallery';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Air Shower | Accumax India',
  description: 'Explore the Accumax India Air Shower gallery with modern cleanroom-ready product visuals and premium presentation.',
};

export default function AirShowerPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Clean Air Equipment</div>
            <h1 className={styles.title}>Air Shower Systems designed for cleaner entries and sharper first impressions</h1>
            <p className={styles.lead}>
              A dedicated image gallery for our Air Shower range, presented with a modern layout that highlights
              build quality, finish, and cleanroom-ready detailing.
            </p>
          </div>
        </section>

        <section className={styles.gallerySection} aria-labelledby="air-shower-gallery-title">
          <div className={styles.galleryInner}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionLabel}>Product Gallery</div>
                <h2 className={styles.sectionTitle} id="air-shower-gallery-title">
                  Visual showcase of our Air Shower installations and chamber design
                </h2>
              </div>
              <p className={styles.sectionText}>
                Each image card uses smooth hover motion, layered overlay treatment, and responsive spacing to keep
                the gallery clean, premium, and easy to browse across screen sizes.
              </p>
            </div>
            <AirShowerGallery />
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
