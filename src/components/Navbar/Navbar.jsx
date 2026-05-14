'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { menuData } from './MenuData';
import styles from './Navbar.module.css';

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeDesktopMenu, setActiveDesktopMenu] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (

    <nav className={styles.navbar}>

      <div className={styles.navContainer}>

        {/* LOGO */}

        <Link href="/" className={styles.logo}>
          ACCUMAX
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <div className={styles.navLinks}>

          <Link href="/" className={styles.navLink}>
            Home
          </Link>

          {/* PRODUCTS */}

          <div
            className={styles.navItem}
            onMouseEnter={() => setActiveDesktopMenu(true)}
            onMouseLeave={() => setActiveDesktopMenu(false)}
          >

            <button className={styles.navLink}>

              Products

              <svg
                className={`${styles.navArrow} ${activeDesktopMenu ? styles.rotateOpen : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>

            </button>

            {/* DROPDOWN */}

            {activeDesktopMenu && (

              <div className={styles.dropdownMenu}>

                {menuData.map((menu, i) => (

                  <div
                    key={i}
                    className={styles.dropdownColumn}
                  >

                    {/* MAIN TITLE */}

                    {menu.href ? (

                      <Link
                        href={menu.href}
                        className={styles.dropdownTitle}
                      >
                        {menu.title}
                      </Link>

                    ) : (

                      <h4 className={styles.dropdownTitle}>
                        {menu.title}
                      </h4>

                    )}

                    {/* SUB MENU */}

                    {menu.children?.map((child, idx) => (

                      <div key={idx}>

                        {/* CHILD DIRECT LINK */}

                        {child.href && (

                          <Link
                            href={child.href}
                            className={styles.dropdownLink}
                          >
                            {child.title}
                          </Link>

                        )}

                        {/* NESTED CHILD */}

                        {child.children && (

                          <div className={styles.nestedGroup}>

                            <p className={styles.nestedTitle}>
                              {child.title}
                            </p>

                            {child.children.map((sub, s) => (

                              <Link
                                key={s}
                                href={sub.href}
                                className={styles.nestedLink}
                              >
                                {sub.title}
                              </Link>

                            ))}

                          </div>

                        )}

                      </div>

                    ))}

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* OTHER MENU */}

          <Link href="/about" className={styles.navLink}>
            About Us
          </Link>

          <Link href="/clients" className={styles.navLink}>
            Client
          </Link>

          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>

          <Link href="/blogs" className={styles.navLink}>
            Blogs
          </Link>

        </div>

        {/* MOBILE BUTTON */}

        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

        {/* ================= MOBILE MENU ================= */}

        <div
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.isOpen : ''}`}
        >

          <Link
            href="/"
            className={styles.mobileLink}
          >
            Home
          </Link>

          {/* PRODUCTS */}

          <div className={styles.mobileProducts}>

            <h3 className={styles.mobileHeading}>
              Products
            </h3>

            {menuData.map((menu, i) => (

              <div key={i}>

                <p className={styles.mobileCategory}>
                  {menu.title}
                </p>

                {/* DIRECT LINK */}

                {menu.href && (

                  <Link
                    href={menu.href}
                    className={styles.mobileSubLink}
                  >
                    View Product
                  </Link>

                )}

                {/* CHILDREN */}

                {menu.children?.map((child, idx) => (

                  <div key={idx}>

                    {/* DIRECT CHILD */}

                    {child.href && (

                      <Link
                        href={child.href}
                        className={styles.mobileSubLink}
                      >
                        {child.title}
                      </Link>

                    )}

                    {/* NESTED */}

                    {child.children && (

                      <div className={styles.mobileNested}>

                        <p className={styles.mobileNestedTitle}>
                          {child.title}
                        </p>

                        {child.children.map((sub, s) => (

                          <Link
                            key={s}
                            href={sub.href}
                            className={styles.mobileNestedLink}
                          >
                            {sub.title}
                          </Link>

                        ))}

                      </div>

                    )}

                  </div>

                ))}

              </div>

            ))}

          </div>

          {/* OTHER LINKS */}

          <Link href="/about" className={styles.mobileLink}>
            About Us
          </Link>

          <Link href="/clients" className={styles.mobileLink}>
            Client
          </Link>

          <Link href="/contact" className={styles.mobileLink}>
            Contact
          </Link>

          <Link href="/blogs" className={styles.mobileLink}>
            Blogs
          </Link>

        </div>

      </div>

    </nav>

  );
};

export default Navbar;