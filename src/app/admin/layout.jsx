import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'; // ✅ new sidebar
import Navbar from '@/components/admin/Navbar';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>

      {/* NEW SIDEBAR */}
      <AdminSidebar />

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          {children}
        </div>
      </div>

    </div>
  );
}