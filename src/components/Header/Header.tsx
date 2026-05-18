'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Dropdown from '../Dropdown/Dropdown';
import { menuData } from '../Navbar/MenuData';


type MenuItem = {
  title: string;
  href?: string;
  children?: MenuItem[];
};

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [productMenu, setProductMenu] = useState<MenuItem[]>(menuData as MenuItem[]);

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
    let isMounted = true;

    const loadProductMenu = async () => {
      try {
        const res = await fetch('/api/product-menu', { cache: 'no-store' });
        const result = await res.json();

        if (isMounted && result.success && Array.isArray(result.data)) {
          setProductMenu(result.data);
        }
      } catch (err) {
        console.error('Product menu fallback active:', err);
      }
    };

    loadProductMenu();

    return () => {
      isMounted = false;
    };
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
    setMobileProductsOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileProductsOpen(false);
  };

  const renderDrawerProducts = (items: MenuItem[], parentKey = 'product') =>
    items.map((item, index) => {
      const key = `${parentKey}-${index}`;

      return (
        <div key={key}>
          {item.href ? (
            <Link
              href={item.href}
              className={styles.drawerProductLink}
              onClick={closeMobileMenu}
            >
              {item.title}
            </Link>
          ) : (
            <span
              className={styles.drawerProductLink}
              style={{ fontWeight: 700, color: '#1e293b' }}
            >
              {item.title}
            </span>
          )}

          {item.children && renderDrawerProducts(item.children, key)}
        </div>
      );
    });

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>

        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <a href="mailto:accumax105@gmail.com" className={styles.topBarLink}>
              accumax105@gmail.com
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
          <Link
            href="/"
            className={styles.logo}
            onClick={closeMobileMenu}
          >
            <Image
              src="/assets/accumax-india1.png"
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
                  <Dropdown items={productMenu} />
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
            <a href="mailto:accumax105@gmail.com" className={styles.ctaButton}>
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

        <Link
          href="/"
          className={styles.drawerLogoWrap}
          onClick={closeMobileMenu}
        >
          <Image
            src="/assets/accumax-india1.png"
            alt="Accumax India"
            width={160}
            height={48}
          />
        </Link>

        <nav className={styles.drawerNav}>

          <button
            className={`${styles.drawerLink} ${styles.drawerProductsToggle}`}
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            Our Products
          </button>

          <div
            className={`${styles.drawerProductsPanel} ${mobileProductsOpen ? styles.drawerProductsPanelOpen : ''
              }`}
          >
            <div className={styles.drawerProductsPanelInner}>
              {renderDrawerProducts(productMenu)}
            </div>
          </div>

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
