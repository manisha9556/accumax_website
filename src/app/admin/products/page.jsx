'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { FaTrash, FaEdit } from 'react-icons/fa';

import { useRouter } from 'next/navigation';

export default function ProductsPage() {

  const router = useRouter();

  const [products, setProducts] = useState([]);




  // FETCH PRODUCTS

  const fetchProducts = async () => {

    const res = await fetch('/api/product');

    const data = await res.json();

    setProducts(data.data || []);
  };



  useEffect(() => {

    fetchProducts();

  }, []);




  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    const confirmDelete =
      confirm("Delete this product?");

    if (!confirmDelete) return;

    await fetch('/api/product', {

      method: 'DELETE',

      body: JSON.stringify({ id }),
    });

    fetchProducts();
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




      {/* TABLE */}

      <div
        style={{
          overflowX: 'auto',
          background: 'white',
          borderRadius: '10px',
          padding: '10px',
          boxShadow:
            '0 4px 20px rgba(0,0,0,0.05)',
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

            <tr
              style={{
                background: '#f1f5f9',
              }}
            >

              <th align="left">Image</th>

              <th align="left">Title</th>

              <th align="left">Category</th>

              <th align="left">Status</th>

              <th align="left">Actions</th>

            </tr>

          </thead>





          <tbody>

            {products.map((item) => (

              <tr
                key={item._id}
                style={{
                  borderBottom:
                    '1px solid #e2e8f0',
                }}
              >

                {/* IMAGE */}

                <td>

                  {item.images?.[0] && (

                    <img
                      src={item.images[0]}
                      width="70"
                      height="70"
                      style={{
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                      }}
                    />

                  )}

                </td>




                {/* TITLE */}

                <td>
                  {item.title}
                </td>




                {/* CATEGORY */}

                <td>
                  {item.category}
                </td>




                {/* STATUS */}

                <td>

                  <span
                    style={{
                      background:
                        item.status === 'Active'
                          ? '#dcfce7'
                          : '#fee2e2',

                      color:
                        item.status === 'Active'
                          ? '#166534'
                          : '#991b1b',

                      padding: '6px 12px',

                      borderRadius: '20px',

                      fontSize: '13px',

                      fontWeight: '600',
                    }}
                  >
                    {item.status}
                  </span>

                </td>




                {/* ACTIONS */}

                <td>

                  <div
                    style={{
                      display: 'flex',
                      gap: '15px',
                    }}
                  >

                    {/* EDIT */}

                    <FaEdit
                      style={{
                        cursor: 'pointer',
                        color: '#2563eb',
                      }}

                      onClick={() =>
                        router.push(
                          `/admin/products/edit/${item._id}`
                        )
                      }
                    />




                    {/* DELETE */}

                    <FaTrash
                      style={{
                        cursor: 'pointer',
                        color: 'red',
                      }}

                      onClick={() =>
                        deleteProduct(item._id)
                      }
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}