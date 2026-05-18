'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { menuData } from '../Navbar/MenuData';

import styles from './Footer.module.css';

export default function Footer() {

  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const aboutHref =
    isHomePage ? '#about' : '/#about';

  const contactHref =
    isHomePage ? '#contact' : '/#contact';

  const companyLinks = [

    {
      label: 'About Us',
      href: aboutHref
    },

    {
      label: 'Major Clients',
      href: '/clients'
    },

    {
      label: 'Gallery',
      href: '#'
    },

    {
      label: 'Blog',
      href: '/blogs'
    },

    {
      label: 'Contact Us',
      href: contactHref
    },

  ];

  return (

    <footer
      className={styles.footer}
      id="contact"
    >

      {/* CTA BAND */}
      <div className={styles.ctaBand}>

        <div className={styles.ctaContent}>

          <h2 className={styles.ctaTitle}>
            Ready to equip your laboratory?
          </h2>

          <p className={styles.ctaSub}>
            Get expert advice and a custom quote
            from our team of specialists.
          </p>

          <div className={styles.ctaActions}>

            <a
              href="tel:+918384062994"
              className={styles.ctaBtn}
            >
              <FaPhoneAlt
                style={{
                  marginRight: "10px"
                }}
              />

              +91 8384062994
            </a>

            <a
              href="mailto:accumax105@gmail.com"
              className={styles.ctaBtnOutline}
            >
              <FaEnvelope
                style={{
                  marginRight: "10px"
                }}
              />

              accumax105@gmail.com
            </a>

          </div>

        </div>

      </div>

      {/* MAIN FOOTER */}
      <div className={styles.main}>

        <div className={styles.mainGrid}>

          {/* BRAND */}
          <div className={styles.brand}>

            <div className={styles.brandLogoWrap}>

              <Image
                src="/assets/accumax-india1.png"
                alt="Accumax India"
                width={180}
                height={48}
                className={styles.brandLogo}
              />

            </div>

            <p className={styles.brandDesc}>

              ISO 9001:2008 Certified manufacturer
              of world-class laboratory equipment.

              Established 1995 in Delhi-NCR,
              serving clients across India
              and globally.

            </p>

            <div className={styles.certBadge}>
              ISO 9001:2008 Certified
            </div>

          </div>
{/* PRODUCTS */}

<div className={styles.col}>

  <div className={styles.colTitle}>
    Products
  </div>

  <ul className={styles.list}>

    {menuData.slice(0, 5).map((item) => (

      <li key={item.title}>

        <Link
          href={item.href || "/"}
          className={styles.footerLink}
        >
          {item.title}
        </Link>

      </li>

    ))}

  </ul>

</div>

          {/* COMPANY */}
          <div className={styles.col}>

            <div className={styles.colTitle}>
              Company
            </div>

            <ul className={styles.list}>

              {companyLinks.map((item) => (

                <li key={item.label}>

                  <Link
                    href={item.href}
                    className={styles.footerLink}
                  >
                    {item.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* CONTACT */}
          <div className={styles.col}>

            <div className={styles.colTitle}>
              Contact
            </div>

            <ul className={styles.contactList}>

              <li>

                <span
                  className={styles.contactIcon}
                  style={{
                    color: "#2563eb"
                  }}
                >
                  <FaPhoneAlt />
                </span>

                <a
                  href="tel:+918384062994"
                  className={styles.footerLink}
                >
                  +91 8384062994
                </a>

              </li>

              <li>

                <span
                  className={styles.contactIcon}
                  style={{
                    color: "#2563eb"
                  }}
                >
                  <FaEnvelope />
                </span>

                <a
                  href="mailto:accumax105@gmail.com"
                  className={styles.footerLink}
                >
                  accumax105@gmail.com
                </a>

              </li>

            </ul>

          </div>

        </div>

        {/* DIVIDER */}
        <div className={styles.divider} />

        {/* BOTTOM */}
        <div className={styles.bottom}>

          <span className={styles.copy}>

            © {new Date().getFullYear()}
            {" "}
            Accumax India.
            All rights reserved.

          </span>

          {/* <span className={styles.copy}>

            Manufacturers of
            World-Class Laboratory Equipment

          </span> */}

        </div>

      </div>

    </footer>

  );
}