'use client';

import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/enquiry')
      .then(res => res.json())
      .then(result => setData(result.data || []));
  }, []);

  // 📊 Chart Data (simple grouping)
  const chartData = data.map((item, i) => ({
    name: `#${i + 1}`,
    enquiries: i + 1,
  }));

  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>

      {/* 🔷 STATS */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Total Enquiries</h3>
          <p>{data.length}</p>
        </div>

        <div className={styles.card}>
          <h3>New</h3>
          <p>{data.filter(d => d.status === 'New').length}</p>
        </div>

        <div className={styles.card}>
          <h3>Contacted</h3>
          <p>{data.filter(d => d.status === 'Contacted').length}</p>
        </div>

        <div className={styles.card}>
          <h3>Closed</h3>
          <p>{data.filter(d => d.status === 'Closed').length}</p>
        </div>
      </div>
 {/* 🔷 RECENT TABLE */}
      <div className={styles.tableContainer}>
        <h3>Recent Enquiries</h3>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 5).map((item) => (
              <tr key={item._id}>
                <td>{item.user_name}</td>
                <td>{item.company_name}</td>
                <td>{item.phone}</td>
                <td>{item.user_email}</td>
                <td>
                  <span className={styles.badge}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 🔷 CHART */}
      <div className={styles.chartBox}>
        <h3>Enquiry Growth</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="enquiries" />
          </LineChart>
        </ResponsiveContainer>
      </div>

     

      {/* 🔷 ACTIVITY */}
      <div className={styles.activity}>
        <h3>Recent Activity</h3>

        <ul>
          {data.slice(0, 5).map((item) => (
            <li key={item._id}>
              📩 New enquiry from <b>{item.user_name}</b>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}








// 'use client';
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import { useEffect, useState } from 'react';
// import styles from './admin.module.css';

// export default function AdminPage() {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState('');

// const fetchData = async () => {
//   try {
//     const res = await fetch('/api/enquiry');
//     const result = await res.json();

//     setData(result.data || []); // ✅ SAFE
//   } catch (error) {
//     console.error(error);
//     setData([]); // ✅ fallback
//   }
// };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const deleteEnquiry = async (id) => {
//     await fetch('/api/enquiry', {
//       method: 'DELETE',
//       body: JSON.stringify({ id }),
//     });

//     fetchData();
//   };

//   const filtered = (data || []).filter(item =>
//   item?.user_name?.toLowerCase().includes(search.toLowerCase())
// );
//   return (
//     <>
//       <h1 className={styles.title}>Dashboard</h1>

//       {/* SEARCH */}
//       <input
//         className={styles.search}
//         placeholder="Search by name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* CARDS */}
//       <div className={styles.cards}>
//         <div className={styles.card}>
//           <h3>Total Enquiries</h3>
//           <p>{data.length}</p>
//         </div>

//         <div className={styles.card}>
//           <h3>Latest</h3>
//           <p>{data[0]?.user_name || 'No Data'}</p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Company</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.user_name}</td>
//                 <td>{item.company_name}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.user_email}</td>

//                 {/* STATUS */}
//                 <td>
//                   <span className={styles.badge}>
//                     {item.status || 'New'}
//                   </span>
//                 </td>

//                 {/* DELETE */}


//                 <td>
//   <div className={styles.actions}>
//     <FaEdit className={styles.editIcon} />

//     <FaTrash
//       className={styles.deleteIcon}
//       onClick={() => deleteEnquiry(item._id)}
//     />
//   </div>
// </td>
//                {/* <td className={styles.actions}>
//   <FaEdit 
//     className={styles.editIcon}
//     title="Edit"
//     onClick={() => alert('Edit feature coming soon')}
//   />

//   <FaTrash 
//     className={styles.deleteIcon}
//     title="Delete"
//     onClick={() => deleteEnquiry(item._id)}
//   />
// </td> */}
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </>
//   );
// }