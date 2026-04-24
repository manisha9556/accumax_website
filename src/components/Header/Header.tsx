'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const productLinks = [
  { label: 'Air shower', href: '/products/air-shower', image: '/airshower.png', category: 'Clean entry system' },
  { label: 'Pcr Workstation', image: '/pcr_workstation.jpg', category: 'Controlled lab workspace' },
  { label: 'Portable clean room', image: '/PortableModularCleanRoom.jpg', category: 'Modular clean space' },
  { label: 'Garment Storage Cabinet', image: '/PortableModularCleanRoom.jpg', category: 'Storage solution' },
  { label: 'Biosafety Cabinets', image: '/pcr_workstation.jpg', category: 'Safety enclosure' },
  { label: 'Laminar Airflow Cabinets', image: '/vertical-laminar-air-flow.jpg', category: 'Sterile airflow bench' },
  { label: 'Fume Hood', image: '/vertical-laminar-air-flow.jpg', category: 'Exhaust protection' },
  { label: 'Sampling / Dispensing Booth', image: '/PortableModularCleanRoom.jpg', category: 'Dust-controlled handling' },
  { label: 'Pass Box', image: '/airshower.png', category: 'Material transfer unit' },
  { label: 'Fan Filter Unit', image: '/vertical-laminar-air-flow.jpg', category: 'Air filtration module' },
  { label: 'Cross over bench', image: '/airshower.png', category: 'Hygiene transition bench' },
  { label: 'Dry Storage Cabinet', image: '/PortableModularCleanRoom.jpg', category: 'Moisture-safe storage' },
  { label: 'Dedusting Tunnel', image: '/airshower.png', category: 'Dust removal system' },
  { label: 'Cold Room', image: '/PortableModularCleanRoom.jpg', category: 'Temperature-controlled room' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const isHomePage = pathname === '/';
  const aboutHref = isHomePage ? '#about' : '/#about';
  const contactHref = isHomePage ? '#contact' : '/#contact';
  const navLinks = [
    { label: 'About Us', href: aboutHref },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: contactHref },
  ];

  const getProductHref = (product: (typeof productLinks)[number]) => product.href ?? contactHref;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <a href="mailto:accumax101@gmail.com" className={styles.topBarLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              accumax101@gmail.com
            </a>
            <span className={styles.topBarDivider}>|</span>
            <a href="tel:+918384062994" className={styles.topBarLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +91 83840 62994
            </a>
          </div>
        </div>

        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Accumax India Home">
            <div className={styles.logoImgWrap}>
              <Image
                src="/accumax-india1.png"
                alt="Accumax India"
                width={180}
                height={48}
                priority
                className={styles.logoImg}
              />
            </div>
          </Link>

          <nav className={styles.nav} aria-label="Primary navigation">
            <div
              className={styles.productsItem}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
              onFocus={() => setProductsOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setProductsOpen(false);
                }
              }}
            >
              <button
                type="button"
                className={`${styles.navLink} ${styles.navButton} ${productsOpen ? styles.navLinkActive : ''}`}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                Our Products
                <svg
                  className={`${styles.navChevron} ${productsOpen ? styles.navChevronOpen : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <span className={styles.navUnderline} />
              </button>

              <div className={`${styles.productsPanel} ${productsOpen ? styles.productsPanelOpen : ''}`}>
                <ul className={styles.productsList}>
                  {productLinks.map((product) => (
                    <li key={product.label}>
                      <Link href={getProductHref(product)} className={styles.productLink} onClick={() => setProductsOpen(false)}>
                        <div className={styles.productThumb}>
                          <Image
                            src={product.image}
                            alt={product.label}
                            fill
                            sizes="(max-width: 1200px) 25vw, 220px"
                            className={styles.productThumbImg}
                          />
                        </div>
                        <div className={styles.productCopy}>
                          <span className={styles.productTitle}>{product.label}</span>
                          <span className={styles.productMeta}>{product.category}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${activeLink === link.href ? styles.navLinkActive : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
                <span className={styles.navUnderline} />
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            <a href="mailto:accumax101@gmail.com" className={styles.ctaButton}>
              Get a Quote
              <span className={styles.ctaArrow}>→</span>
            </a>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerLogoWrap}>
         
         <Image
  src="/accumax-india1.png"
  alt="Accumax India"
  fill
  className={styles.logoImg}
/>

          {/* <Image
            src="/accumax-india1.png"
            alt="Accumax India"
            width={160}
            height={48}
            className={styles.logoImg}
          /> */}
        </div>
        <nav className={styles.drawerNav}>
          <button
            type="button"
            className={`${styles.drawerLink} ${styles.drawerProductsToggle}`}
            style={{ '--delay': '0ms' } as React.CSSProperties}
            onClick={() => setMobileProductsOpen((current) => !current)}
            aria-expanded={mobileProductsOpen}
          >
            <span>Our Products</span>
            <svg
              className={`${styles.drawerChevron} ${mobileProductsOpen ? styles.drawerChevronOpen : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <div className={`${styles.drawerProductsPanel} ${mobileProductsOpen ? styles.drawerProductsPanelOpen : ''}`}>
            <div className={styles.drawerProductsPanelInner}>
              <ul className={styles.drawerProductsList}>
                {productLinks.map((product) => (
                  <li key={product.label}>
                    <Link href={getProductHref(product)} className={styles.drawerProductLink} onClick={closeMobileMenu}>
                      {product.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.drawerLink}
              style={{ '--delay': `${(i + 1) * 60}ms` } as React.CSSProperties}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+918384062994" className={styles.drawerCta} onClick={closeMobileMenu}>
            Get a Quote →
          </a>
        </nav>
      </div>

      {menuOpen && (
        <div className={styles.backdrop} onClick={closeMobileMenu} aria-hidden="true" />
      )}
    </>
  );
}
