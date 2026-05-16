'use client';

import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import styles from '../admin.module.css';

const emptyForm = {
  title: '',
  slug: '',
  status: 'Active',
  order: 0,
};

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function ProductCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      try {
        const res = await fetch('/api/product-category', { cache: 'no-store' });
        const result = await res.json();

        if (active) {
          setCategories(result.data || []);
        }
      } catch (err) {
        console.error('Unable to fetch product categories:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  const refreshCategories = async () => {
    const res = await fetch('/api/product-category', { cache: 'no-store' });
    const result = await res.json();
    setCategories(result.data || []);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert('Enter category title');
      return;
    }

    const payload = {
      ...form,
      slug: slugify(form.slug || form.title),
      order: Number(form.order) || 0,
    };

    const res = await fetch('/api/product-category', {
      method: editId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editId ? { ...payload, id: editId } : payload),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message || 'Unable to save category');
      return;
    }

    setForm(emptyForm);
    setEditId('');
    await refreshCategories();
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setForm({
      title: category.title || '',
      slug: category.slug || '',
      status: category.status || 'Active',
      order: category.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) {
      return;
    }

    const res = await fetch('/api/product-category', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message || 'Unable to delete category');
      return;
    }

    await refreshCategories();
  };

  const filteredCategories = categories.filter((category) => {
    const query = search.toLowerCase();
    return (
      category.title?.toLowerCase().includes(query) ||
      category.slug?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <h1 className={styles.title}>Product Categories</h1>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          className={styles.search}
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className={styles.search}
          placeholder="Category title"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm((prev) => ({
              ...prev,
              title,
              slug: prev.slug || slugify(title),
            }));
          }}
        />

        <input
          className={styles.search}
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              slug: e.target.value,
            }))
          }
        />

        <input
          className={styles.search}
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              order: e.target.value,
            }))
          }
          style={{ width: '120px' }}
        />

        <select
          className={styles.search}
          value={form.status}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          style={{ width: '140px' }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button className={styles.addBtn} onClick={handleSubmit}>
          <FaPlus />
          {editId ? 'Update' : 'Add'}
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ color: '#2563eb' }}>Title</th>
              <th style={{ color: '#2563eb' }}>Slug</th>
              <th style={{ color: '#2563eb' }}>Order</th>
              <th style={{ color: '#2563eb' }}>Status</th>
              <th style={{ color: '#2563eb' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading categories...</td>
              </tr>
            ) : filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="5">No categories found.</td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td>{category.title}</td>
                  <td>{category.slug}</td>
                  <td>{category.order || 0}</td>
                  <td>
                    <span className={styles.badge}>{category.status}</span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <FaEdit className={styles.editIcon} onClick={() => handleEdit(category)} />
                      <FaTrash
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(category._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
