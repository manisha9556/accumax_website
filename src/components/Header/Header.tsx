'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Dropdown from '../Dropdown/Dropdown';
import { menuData } from '../Navbar/MenuData';

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  // ✅ REQUIRED for dropdown
  const [productsOpen, setProductsOpen] = useState(false);

  const isHomePage = pathname === '/';
  const aboutHref = isHomePage ? '#about' : '/#about';
  const contactHref = '/contact';

  const navLinks = [
    { label: 'Blog', href: '/blogs' },
    { label: 'About Us', href: aboutHref },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: contactHref },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
    setMobileProductsOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>

        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <a href="mailto:accumax101@gmail.com" className={styles.topBarLink}>
              accumax101@gmail.com
            </a>
            <span className={styles.topBarDivider}>|</span>
            <a href="tel:+918384062994" className={styles.topBarLink}>
              +91 83840 62994
            </a>
          </div>
        </div>

        {/* MAIN NAV */}
        <div className={styles.inner}>

          {/* LOGO */}
          <Link href="/" className={styles.logo}>
            <Image
              src="/accumax-india1.png"
              alt="Accumax India"
              width={180}
              height={48}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className={styles.nav}>

            {/* ✅ PRODUCTS DROPDOWN */}
            <div
              className={styles.productsItem}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className={styles.navLink}>
                Our Products
              </button>

              {productsOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999 }}>
                  <Dropdown items={menuData} />
                </div>
              )}
            </div>

            {/* OTHER LINKS */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${activeLink === link.href ? styles.navLinkActive : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </Link>
            ))}

          </nav>

          {/* RIGHT SIDE */}
          <div className={styles.right}>
            <a href="mailto:accumax101@gmail.com" className={styles.ctaButton}>
              Get a Quote →
            </a>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>

        <div className={styles.drawerLogoWrap}>
          <Image
            src="/accumax-india1.png"
            alt="Accumax India"
            width={160}
            height={48}
          />
        </div>

        <nav className={styles.drawerNav}>

          <button
            className={styles.drawerLink}
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            Our Products
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={styles.drawerLink}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </Link>
          ))}

          <a href="tel:+918384062994" className={styles.drawerCta}>
            Get a Quote →
          </a>
        </nav>
      </div>

      {menuOpen && <div className={styles.backdrop} onClick={closeMobileMenu} />}
    </>
  );
}