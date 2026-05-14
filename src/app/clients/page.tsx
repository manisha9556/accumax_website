
'use client';

import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatWidget from '@/components/ChatWidget/ChatWidget';
import styles from './page.module.css';
import { TypeAnimation } from 'react-type-animation';

const clients = [
  {
    name: 'AIIMS Delhi',
    logo: '/clients/AIIMS_Delhi.jpeg',
    sector: 'Healthcare',
  },
  {
    name: 'Asian Paints',
    logo: '/clients/Asian_paint.jpeg',
    sector: 'Paints',
  },
  {
    name: 'BITS',
    logo: '/clients/Bits.jpeg',
    sector: 'Education',
  },
  {
    name: 'Berger Paint',
    logo: '/clients/Burger_Paint.png',
    sector: 'Paints',
  },
  {
    name: 'CSIR IICT',
    logo: '/clients/csir_iict.jpeg',
    sector: 'Research',
  },
  {
    name: 'CSIR IIIM',
    logo: '/clients/CSIR_IIIM.jpeg',
    sector: 'Research',
  },
  {
    name: 'Dabur',
    logo: '/clients/Dabur.jpeg',
    sector: 'Healthcare',
  },
  {
    name: 'Denso Ten Minda',
    logo: '/clients/denso_ten_minda.jpeg',
    sector: 'Automobile',
  },
  {
    name: 'DMRC',
    logo: '/clients/DMRC.jpeg',
    sector: 'Metro Rail',
  },
  {
    name: 'DS Group',
    logo: '/clients/Ds_Group.jpeg',
    sector: 'Consumer Goods',
  },
  {
    name: 'Ester Industries Limited',
    logo: '/clients/Ester-Industries-Limited.webp',
    sector: 'Manufacturing',
  },
  {
    name: 'Genus Power Infrastructures Limited',
    logo: '/clients/Genus_Power_Infrastructures_Limited.jpeg',
    sector: 'Power',
  },
  {
    name: 'India Medicine Pharmaceuticals Corporation Limited',
    logo: '/clients/govt1.jpeg',
    sector: 'Government',
  },
  {
    name: 'Haldiram',
    logo: '/clients/Haldiram.jpeg',
    sector: 'Food Industry',
  },
  {
    name: 'Honda',
    logo: '/clients/honda.jpeg',
    sector: 'Automobile',
  },
  {
    name: 'IASST Guwahati',
    logo: '/clients/IASST-Guwahati.jpeg',
    sector: 'Research',
  },
  {
    name: 'IIT Bombay',
    logo: '/clients/IIT_Bombay.jpeg',
    sector: 'Education',
  },
  {
    name: 'IIT Kharagpur',
    logo: '/clients/IIT_Kharagpur.jpeg',
    sector: 'Education',
  },
  {
    name: 'Indian Air Force',
    logo: '/clients/indian_air_force.jpeg',
    sector: 'Defense',
  },
  {
    name: 'JCB',
    logo: '/clients/jcb.jpeg',
    sector: 'Manufacturing',
  },
  {
    name: 'JSW Steel',
    logo: '/clients/JSWSteel.jpeg',
    sector: 'Steel Industry',
  },
  {
    name: 'LG',
    logo: '/clients/LG.jpeg',
    sector: 'Electronics',
  },
  {
    name: 'Maruti Suzuki',
    logo: '/clients/MarutiSuzuki.jpeg',
    sector: 'Automobile',
  },
  {
    name: 'Microtek',
    logo: '/clients/microtek.png',
    sector: 'Electronics',
  },
  {
    name: 'Minda Projects',
    logo: '/clients/minda_projects.jpeg',
    sector: 'Infrastructure',
  },
  {
    name: 'Nirula',
    logo: '/clients/Nirula.jpeg',
    sector: 'Food Industry',
  },
  {
    name: 'NRRI',
    logo: '/clients/NRRI.jpeg',
    sector: 'Research',
  },
  {
    name: 'ONGC',
    logo: '/clients/ONGC.jpeg',
    sector: 'Oil & Gas',
  },
  {
    name: 'PN',
    logo: '/clients/PN.jpeg',
    sector: 'Manufacturing',
  },
  {
    name: 'Sahasra',
    logo: '/clients/Sahasra.jpeg',
    sector: 'Electronics',
  },
  {
    name: 'Saint-Gobain',
    logo: '/clients/saint-gobain.jpeg',
    sector: 'Building Materials',
  },
  {
    name: 'Sun Pharma',
    logo: '/clients/SunPharma.jpeg',
    sector: 'Pharmaceuticals',
  },
];

export default function ClientsPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>

        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>

            <div className={styles.eyebrow}>
              Trusted by laboratories and manufacturers
            </div>

            {/* TYPEWRITER TITLE */}
            <h4 className={styles.title}>
              <TypeAnimation
                sequence={[
                  'Clients',
                  1000,
                  'Clients who rely',
                  1000,
                  'Clients who rely on Accumax India',
                  1000,
                  'Clients who rely on Accumax India for dependable lab infrastructure',
                  3000,
                ]}
                wrapper="span"
                speed={50}
                repeat={0}
                // cursor={true}
              />
            </h4>

            <p className={styles.lead}>
              From pharmaceutical facilities to research institutions,
              we support teams that need precise, durable equipment
              and responsive service.
            </p>

            {/* STATS */}
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h2>500+</h2>
                <p>Clients Served</p>
              </div>

              <div className={styles.statCard}>
                <h2>15+</h2>
                <p>Industries</p>
              </div>

              <div className={styles.statCard}>
                <h2>10+</h2>
                <p>Years Experience</p>
              </div>
            </div>

          </div>
        </section>

        {/* CLIENTS SECTION */}
        <section
          className={styles.clientsSection}
          aria-labelledby="client-grid-title"
        >
          <div className={styles.sectionInner}>

            <div className={styles.sectionHeader}>

              <div>
                <div className={styles.sectionLabel}>
                  Client Network
                </div>

                <h2
                  className={styles.sectionTitle}
                  id="client-grid-title"
                >
                  Organizations that trust Accumax India
                </h2>
              </div>

              <p className={styles.sectionText}>
                We proudly serve pharmaceutical companies,
                research laboratories, manufacturing facilities,
                government organizations, and educational institutes
                across India.
              </p>

            </div>

            {/* GRID */}
            <div className={styles.grid}>
              {clients.map((client) => (
                <article
                  key={client.name}
                  className={styles.card}
                >

                  {/* LOGO */}
                  <div className={styles.logoPlate}>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className={styles.clientLogo}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className={styles.meta}>
                    <h3 className={styles.clientName}>
                      {client.name}
                    </h3>

                    <p className={styles.clientSector}>
                      {client.sector}
                    </p>
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