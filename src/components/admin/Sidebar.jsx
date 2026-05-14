'use client';

import Link from 'next/link';
import styles from '../../app/admin/admin.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>ACCUMAX</h2>

      <ul>
        <li><Link href="/admin">Dashboard</Link></li>
        <li><Link href="/admin">Enquiries</Link></li>
        <li><Link href="/">Website</Link></li>
      </ul>
    </div>
  );
}