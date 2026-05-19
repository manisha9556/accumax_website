"use client";

import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import Navbar from "@/components/admin/Navbar";

import styles from "./admin.module.css";

export default function AdminLayout({
  children,
}) {

  const router = useRouter();

  // LOGOUT
  const handleLogout = async () => {

    try {

      // CLEAR COOKIE

      document.cookie =
        "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // REDIRECT

      router.push("/admin/login");

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className={styles.layout}>

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <div className={styles.main}>

        {/* TOPBAR */}
        <div
          style={{
            height: "70px",
            background: "#ffffff",
            borderBottom:
              "1px solid #e5e7eb",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            padding: "0 25px",

            position: "sticky",

            top: 0,

            zIndex: 100,
          }}
        >

          {/* LEFT */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Admin Panel
          </div>

          {/* RIGHT */}
          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",

              color: "white",

              border: "none",

              padding: "10px 18px",

              borderRadius: "8px",

              cursor: "pointer",

              fontWeight: "600",
            }}
          >
            Logout
          </button>

        </div>

        {/* PAGE CONTENT */}
        <div className={styles.content}>

          {children}

        </div>

      </div>

    </div>
  );
}




// import AdminSidebar from '@/components/AdminSidebar/AdminSidebar'; // ✅ new sidebar
// import Navbar from '@/components/admin/Navbar';
// import styles from './admin.module.css';

// export default function AdminLayout({ children }) {
//   return (
//     <div className={styles.layout}>

//       {/* NEW SIDEBAR */}
//       <AdminSidebar />

//       <div className={styles.main}>
//         <Navbar />

//         <div className={styles.content}>
//           {children}
//         </div>
//       </div>

//     </div>
//   );
// }