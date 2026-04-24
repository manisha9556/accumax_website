import styles from './ProductsGrid.module.css';

const categories = [
  {
    icon: '🧪',
    title: 'Autoclaves',
    desc: 'Portable, Vertical, Horizontal & Triple-Walled sterilization autoclaves for labs and hospitals.',
    color: '#2c8be3',
  },
  {
    icon: '🌡️',
    title: 'Test Chambers',
    desc: 'Environmental, Humidity, Stability, Battery & Seed Germinator test chambers for precision testing.',
    color: '#8b5cf6',
  },
  {
    icon: '🔥',
    title: 'Ovens & Furnaces',
    desc: 'Hot Air Ovens, Industrial Drying Ovens, Vacuum Ovens, High Temperature Muffle Furnaces.',
    color: '#f97316',
  },
  {
    icon: '🧫',
    title: 'Incubators',
    desc: 'BOD, Bacteriological, Dry Bath, Cooling, Orbital Shaker Incubators for microbiology labs.',
    color: '#15bc99',
  },
  {
    icon: '⚗️',
    title: 'Analytical Instruments',
    desc: 'pH Meters, Bomb Calorimeters, Spectrophotometers, Dissolution Apparatus, Karl Fischer Titrators.',
    color: '#ef4444',
  },
  {
    icon: '🌊',
    title: 'Water Baths',
    desc: 'Shaking, Refrigerated, Serological, Histology, Ultrasonic Water Baths and Distillation Units.',
    color: '#06b6d4',
  },
  {
    icon: '🔄',
    title: 'Shakers & Mixers',
    desc: 'Orbital, Reciprocating, Wrist Action Shakers, Gel Rockers, Ball Mill, Vortex Mixers.',
    color: '#f59e0b',
  },
  {
    icon: '🛡️',
    title: 'Lab Safety Equipment',
    desc: 'Fume Cabinets, Desiccators, Centrifuges, and specialized safety equipment for laboratories.',
    color: '#84cc16',
  },
];

export default function ProductsGrid() {
  return (
    <section className={styles.section} id="products">
      <div className={styles.container}>
        <div className={styles.sectionLabel}>Product Range</div>
        <h2 className={styles.sectionTitle}>100+ Precision Instruments</h2>
        <p className={styles.sectionSub}>
          From R&D labs to industrial testing, Accumax India manufactures equipment that meets international quality standards.
        </p>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat.title} className={styles.card} style={{ '--card-accent': cat.color } as React.CSSProperties}>
              <div className={styles.iconWrap} style={{ background: `${cat.color}1a`, border: `1px solid ${cat.color}33` }}>
                <span className={styles.icon}>{cat.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardDesc}>{cat.desc}</p>
              <div className={styles.cardArrow}>→</div>
            </div>
          ))}
        </div>
        <div className={styles.ctaWrap}>
          <a href="tel:+918384062994" className={styles.ctaBtn}>
            Request Full Catalogue
          </a>
        </div>
      </div>
    </section>
  );
}
