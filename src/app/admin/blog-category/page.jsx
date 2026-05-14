'use client';
import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import styles from '../admin.module.css';

export default function BlogCategoryPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState('asc');
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await fetch('/api/blog-category');
    const result = await res.json();
    setData(result.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!name) return alert("Enter category");

    if (editId) {
      await fetch('/api/blog-category', {
        method: 'PUT',
        body: JSON.stringify({ id: editId, name }),
      });
      setEditId(null);
    } else {
      await fetch('/api/blog-category', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
    }

    setName('');
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    await fetch('/api/blog-category', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    fetchData();
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditId(item._id);
  };

  // 🔍 SEARCH + SORT
  const filtered = data
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // 📄 PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      <h1 className={styles.title}>Blog List</h1>

      {/* ADD FORM */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>

  {/* SEARCH */}
  <input
    placeholder="Search category..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      width: '250px'
    }}
  />

  {/* SORT DROPDOWN */}
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    style={{
      color: 'blue',
      padding: '1px',
      borderRadius: '6px',
      border: '1px solid #5612deff',
      cursor: 'pointer'
    }}
  >
    <option value="asc">Sort A → Z</option>
    <option value="desc">Sort Z → A</option>
  </select>

</div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          className={styles.search}
          placeholder="Enter category name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className={styles.addBtn} 
        onClick={handleSubmit}
        style={{ padding: '4px 8px', fontSize: '13px',height: '36px' }}
        >
          <FaPlus/>
          {editId ? " Update" : " Add"}
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{color: "#2563eb"}}>Blog Title</th>
              <th style={{color: "#2563eb"}}>Status</th>
              <th style={{color: "#2563eb"}}>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>

                <td>
                  <span className={styles.badge}>
                    {item.status || "Active"}
                  </span>
                </td>

                <td>
                  <div className={styles.actions}>
                    <FaEdit
                      className={styles.editIcon}
                      onClick={() => handleEdit(item)}
                    />

                    <FaTrash
                      className={styles.deleteIcon}
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px',justifyContent: 'center'}}>
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