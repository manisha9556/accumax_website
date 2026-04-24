import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import styles from './page.module.css';

const clients = [
  { name: 'Apex Biolabs', tag: 'AB', sector: 'Pharmaceuticals', tone: 'var(--client-tone-1)' },
  { name: 'Zenith Diagnostics', tag: 'ZD', sector: 'Diagnostics', tone: 'var(--client-tone-2)' },
  { name: 'Orion Research', tag: 'OR', sector: 'Research Institute', tone: 'var(--client-tone-3)' },
  { name: 'Northstar Foods', tag: 'NF', sector: 'Food Testing', tone: 'var(--client-tone-4)' },
  { name: 'Helix Life Sciences', tag: 'HL', sector: 'Life Sciences', tone: 'var(--client-tone-5)' },
  { name: 'Velocity Auto Labs', tag: 'VA', sector: 'Automotive', tone: 'var(--client-tone-6)' },
  { name: 'Summit University', tag: 'SU', sector: 'Higher Education', tone: 'var(--client-tone-7)' },
  { name: 'Evergreen Formulations', tag: 'EF', sector: 'Manufacturing', tone: 'var(--client-tone-8)' },
  { name: 'Prime Analytical', tag: 'PA', sector: 'Analytical Testing', tone: 'var(--client-tone-9)' },
  { name: 'Crest Biotech', tag: 'CB', sector: 'Biotechnology', tone: 'var(--client-tone-10)' },
  { name: 'Mercury Cleanrooms', tag: 'MC', sector: 'Cleanroom Systems', tone: 'var(--client-tone-11)' },
  { name: 'Vertex Nutriscience', tag: 'VN', sector: 'Nutraceuticals', tone: 'var(--client-tone-12)' },
];

export const metadata: Metadata = {
  title: 'Clients | Accumax India',
  description: 'Explore the organizations and industries served by Accumax India across pharmaceuticals, research, food testing, manufacturing, and more.',
};

export default function ClientsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Trusted by laboratories and manufacturers</div>
            <h1 className={styles.title}>Clients who rely on Accumax India for dependable lab infrastructure</h1>
            <p className={styles.lead}>
              From pharmaceutical facilities to research institutions, we support teams that need precise,
              durable equipment and responsive service.
            </p>
          </div>
        </section>

        <section className={styles.clientsSection} aria-labelledby="client-grid-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionLabel}>Client Network</div>
                <h2 className={styles.sectionTitle} id="client-grid-title">
                  A modern showcase of the organizations we serve
                </h2>
              </div>
              <p className={styles.sectionText}>
                Built as a dedicated destination rather than a homepage anchor, this page highlights client
                relationships in a clean, responsive grid.
              </p>
            </div>

            <div className={styles.grid}>
              {clients.map((client) => (
                <article key={client.name} className={styles.card}>
                  <div className={styles.logoPlate}>
                    <div className={styles.logoMark} style={{ '--client-tone': client.tone } as CSSProperties}>
                      <span className={styles.logoTag}>{client.tag}</span>
                      <span className={styles.logoName}>{client.name}</span>
                    </div>
                  </div>
                  <div className={styles.meta}>
                    <h3 className={styles.clientName}>{client.name}</h3>
                    <p className={styles.clientSector}>{client.sector}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
