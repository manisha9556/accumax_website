import React from 'react';
import Link from 'next/link';
import { menuData } from './MenuData';
import styles from './Navbar.module.css';

/**
 * MegaMenu Component (Desktop specifically)
 * Renders the 4-column grid of products when hovering over 'Products' in the Navbar
 */
const MegaMenu = () => {
  return (
    <div className={styles.megaMenuWrapper}>
      <div className={styles.megaMenuGrid}>
        {menuData.map((category) => (
          <div key={category.id} className={styles.megaMenuCategory}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.categoryList}>
              {category.items.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className={styles.productLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
