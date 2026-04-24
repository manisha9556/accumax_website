'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MegaMenu from './MegaMenu';
import { menuData } from './MenuData';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState(null);
  
  // Mobile accordion state
  const [mobileMenuLayer, setMobileMenuLayer] = useState(null); // 'products' or null
  const [openAccordion, setOpenAccordion] = useState(null); // category ID

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileLayer = (layerName) => {
    setMobileMenuLayer(mobileMenuLayer === layerName ? null : layerName);
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          ACCUMAX
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          
          {/* Mega Menu Trigger (Desktop) */}
          <div 
            className={styles.navItem}
            onMouseEnter={() => {
              console.log('Mouse entered Products');
              setActiveDesktopMenu('products');
            }}
            onMouseLeave={() => {
              console.log('Mouse left Products');
              setActiveDesktopMenu(null);
            }}
          >
            <button className={styles.navLink}>
              Products
              <svg 
                className={`${styles.navArrow} ${activeDesktopMenu === 'products' ? styles.rotateOpen : ''}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {/* Desktop Mega Menu Component - explicitly passed state styling */}
            <div className={`${styles.megaMenuWrapper} ${activeDesktopMenu === 'products' ? styles.showMegaMenu : ''}`}>
              <MegaMenu />
            </div>
          </div>

          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
           <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
           <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
           <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
        </button>

        {/* MOBILE MENU DROPDOWN */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.isOpen : ''}`}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          
          {/* Products Top-Level Mobile Button */}
          <div className={styles.mobileNavGroup}>
            <button 
              className={styles.mobileNavToggle}
              onClick={() => toggleMobileLayer('products')}
            >
              Products
              <svg 
                className={styles.navArrow} 
                style={{ transform: mobileMenuLayer === 'products' ? 'rotate(180deg)' : 'none' }}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Inner Mobile Products Layer */}
            <div className={`${styles.mobileLayerWrapper} ${mobileMenuLayer === 'products' ? styles.isOpen : ''}`}>
              <div className={styles.mobileLayerInner}>
                {menuData.map((category) => {
                  const isOpen = openAccordion === category.id;
                  return (
                    <div key={category.id} className={styles.mobileAccordionItem}>
                      <button 
                        className={styles.mobileAccordionToggle}
                        onClick={() => toggleAccordion(category.id)}
                      >
                        {category.title}
                        <svg 
                          className={styles.navArrow} 
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <div className={`${styles.mobileAccordionContent} ${isOpen ? styles.isOpen : ''}`}>
                        <div className={styles.mobileAccordionInner}>
                          <ul className={styles.mobileSubList}>
                            {category.items.map((item, idx) => (
                              <li key={idx}>
                                <Link 
                                  href={item.href} 
                                  className={styles.productLink}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Link href="/about" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
