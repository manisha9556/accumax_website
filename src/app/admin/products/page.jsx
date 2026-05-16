'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const res = await fetch('/api/product', { cache: 'no-store' });
        const result = await res.json();

        if (active) {
          setProducts(result.data || []);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const refreshProducts = async () => {
    const res = await fetch('/api/product', { cache: 'no-store' });
    const result = await res.json();
    setProducts(result.data || []);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) {
      return;
    }

    await fetch('/api/product', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    await refreshProducts();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
        }}
      >
        <h1>Manage Products</h1>

        <Link href="/admin/products/add">
          <button
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            + Add Product
          </button>
        </Link>
      </div>

      <div
        style={{
          overflowX: 'auto',
          background: 'white',
          borderRadius: '10px',
          padding: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <table
          width="100%"
          cellPadding="12"
          style={{
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th align="left">Image</th>
              <th align="left">Title</th>
              <th align="left">Category</th>
              <th align="left">Slug Path</th>
              <th align="left">Menu</th>
              <th align="left">Status</th>
              <th align="left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7">No products found.</td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item._id}
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <td>
                    {(item.heroImage || item.images?.[0]) && (
                      <img
                        src={item.heroImage || item.images[0]}
                        width="70"
                        height="70"
                        alt={item.title}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                        }}
                      />
                    )}
                  </td>

                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.slugPath || item.slug}</td>

                  <td>
                    <span
                      style={{
                        background: item.showInMenu ? '#dbeafe' : '#e2e8f0',
                        color: item.showInMenu ? '#1d4ed8' : '#475569',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      {item.showInMenu ? 'Visible' : 'Hidden'}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        background: item.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: item.status === 'Active' ? '#166534' : '#991b1b',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <FaEdit
                        style={{ cursor: 'pointer', color: '#2563eb' }}
                        onClick={() => router.push(`/admin/products/edit/${item._id}`)}
                      />

                      <FaTrash
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => deleteProduct(item._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
