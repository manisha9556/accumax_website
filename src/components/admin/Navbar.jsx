'use client';

import styles from '../../app/admin/admin.module.css';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <h3>Admin Panel</h3>
      <p>Welcome, Admin</p>
    </div>
  );
}