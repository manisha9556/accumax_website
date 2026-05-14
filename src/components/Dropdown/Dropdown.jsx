'use client';

import Link from 'next/link';
import styles from './dropdown.module.css';

const Dropdown = ({ items }) => {

  return (

    <ul className={styles.dropdown}>

      {items.map((item, index) => (

        <li
          key={index}
          className={styles.item}
        >

          {/* CLICKABLE PARENT */}
          {item.href ? (

            <Link
              href={item.href}
              className={styles.link}
            >

              {item.title}

              {item.children && ' ▶'}

            </Link>

          ) : (

            <span className={styles.link}>
              {item.title} ▶
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