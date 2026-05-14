// src/app/admin/blogs/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../admin.module.css';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();

  const [data, setData] = useState([]);

  // 🔥 FILTER STATES
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // 📄 PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const res = await fetch('/api/blog');
    const result = await res.json();
    setData(result.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔁 STATUS TOGGLE
  const toggleStatus = async (item) => {
    const newStatus = item.status === "Active" ? "Inactive" : "Active";

    await fetch('/api/blog', {
      method: 'PUT',
      body: JSON.stringify({
        id: item._id,
        title: item.title,
        category: item.category._id,
        description: item.description,
        status: newStatus,
      }),
    });

    fetchData();
  };

  // ❌ DELETE
  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;

    await fetch('/api/blog', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    fetchData();
  };

  // 🔍 FILTER + SORT
  const filtered = data
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      statusFilter === 'all' ? true : item.status === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // date
    });

  // 📄 PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      <h1 className={styles.title}>Blogs</h1>

      {/* ADD BUTTON */}
      <Link href="/admin/blogs/add">
        <button className={styles.addBtn}>+ Add Blog</button>
      </Link>

      {/* 🔥 FILTER BAR */}
      <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>

        {/* SEARCH */}
        <input
          placeholder="Search blog..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.search}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* SORT */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.search}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>

      </div>

      {/* 📊 TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Image</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id}>

                <td>{item.title}</td>

                <td>{item.category?.name}</td>

                <td>
                  {item.images?.[0] && (
                    <img
                      src={item.images[0]}
                      width="60"
                      style={{ borderRadius: "6px" }}
                    />
                  )}
                </td>

                <td style={{ maxWidth: "200px" }}>
                  {item.description.slice(0, 50)}...
                </td>

                <td>
                  <span
                    className={styles.badge}
                    style={{
                      background: item.status === "Active" ? "#22c55e" : "#ef4444",
                      cursor: "pointer"
                    }}
                    onClick={() => toggleStatus(item)}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className={styles.actions}>
                    <FaEdit
                      className={styles.editIcon}
                      onClick={() => router.push(`/admin/blogs/edit/${item._id}`)}
                    />

                    <FaTrash
                      className={styles.deleteIcon}
                      onClick={() => deleteBlog(item._id)}
                    />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* 📄 PAGINATION UI */}
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: '6px 10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                background: currentPage === i + 1 ? '#2563eb' : '#ddd',
                color: currentPage === i + 1 ? 'white' : 'black'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}