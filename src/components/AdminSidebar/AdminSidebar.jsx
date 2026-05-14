'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './AdminSidebar.module.css';
import { adminMenu } from '@/data/adminMenu';
import { FaChevronDown } from 'react-icons/fa';

export default function AdminSidebar() {
  const [openIndex, setOpenIndex] = useState(null);
  const pathname = usePathname();

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>ACCUMAX</h2>

      {adminMenu.map((item, index) => {
        const Icon = item.icon;

        return (
          <div key={index}>

            {/* MAIN ITEM */}
            <div
              className={`${styles.menuItem} ${
                pathname === item.path ? styles.active : ''
              }`}
              onClick={() => item.children && toggleMenu(index)}
            >
              <div className={styles.menuContent}>
                <Icon className={styles.icon} />

                {item.path ? (
                  <Link href={item.path}>{item.title}</Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </div>

              {item.children && (
                <FaChevronDown
                  className={`${styles.arrow} ${
                    openIndex === index ? styles.rotate : ''
                  }`}
                />
              )}
            </div>

            {/* SUB MENU */}
            {item.children && (
              <div
                className={`${styles.subMenu} ${
                  openIndex === index ? styles.show : ''
                }`}
              >
                {item.children.map((sub, i) => (
                  <Link
                    key={i}
                    href={sub.path}
                    className={`${styles.subItem} ${
                      pathname === sub.path ? styles.activeSub : ''
                    }`}
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}