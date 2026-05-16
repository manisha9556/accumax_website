'use client';

import Link from 'next/link';
import styles from './dropdown.module.css';

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.chevron}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Dropdown = ({ items }) => {
  return (
    <ul className={styles.dropdown}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          
          {/* CLICKABLE PARENT */}
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              <span className={styles.label}>{item.title}</span>
              {item.children && <ChevronIcon />}
            </Link>
          ) : (
            <span className={styles.link}>
              <span className={styles.label}>{item.title}</span>
              {item.children && <ChevronIcon />}
            </span>
          )}

          {/* SUBMENU */}
          {item.children && (
            <div className={styles.submenu}>
              <Dropdown items={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;