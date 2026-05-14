'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productHierarchy } from '@/data/products';

export default function EditProduct() {

  const { id } = useParams();

  const router = useRouter();

  const [activeTab, setActiveTab] = useState('general');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    status: 'Active',
  });

  const [images, setImages] = useState([]);

  const [newImages, setNewImages] = useState([]);

  // FETCH PRODUCT

  useEffect(() => {

    fetch('/api/product')
      .then(res => res.json())
      .then(data => {

        const product = data.data.find(
          item => item._id === id
        );

        if (product) {

          setForm({
            title: product.title,
            slug: product.slug,
            category: product.category,
            description: product.description,
            status: product.status,
          });

          setImages(product.images || []);
        }

      });

  }, [id]);



  // REMOVE EXISTING IMAGE

  const removeImage = (img) => {

    setImages(
      images.filter(i => i !== img)
    );
  };



  // NEW IMAGE

  const handleNewImages = (e) => {

    setNewImages([...e.target.files]);
  };



  // UPDATE PRODUCT

  const handleUpdate = async () => {

    const formData = new FormData();

    formData.append("id", id);

    formData.append("title", form.title);

    formData.append("slug", form.slug);

    formData.append("category", form.category);

    formData.append("description", form.description);

    formData.append("status", form.status);

    formData.append(
      "existingImages",
      JSON.stringify(images)
    );

    newImages.forEach(img => {

      formData.append("images", img);
    });

    const res = await fetch('/api/product', {
      method: 'PUT',
      body: formData,
    });

    const result = await res.json();

    if (result.success) {

      alert("✅ Product Updated");

      router.push('/admin/products');
    }
    else {

      alert("❌ Update Failed");
    }
  };



  return (

    <div
      style={{
        padding: '30px',
        maxWidth: '1000px',
      }}
    >

      <h1
        style={{
          marginBottom: '25px',
        }}
      >
        Edit Product
      </h1>



      {/* TABS */}

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
        }}
      >

        <button
          onClick={() => setActiveTab('general')}
          style={{
            padding: '12px 20px',
            background:
              activeTab === 'general'
                ? '#2563eb'
                : '#e2e8f0',

            color:
              activeTab === 'general'
                ? 'white'
                : '#0f172a',

            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          General
        </button>

        <button
          onClick={() => setActiveTab('images')}
          style={{
            padding: '12px 20px',
            background:
              activeTab === 'images'
                ? '#2563eb'
                : '#e2e8f0',

            color:
              activeTab === 'images'
                ? 'white'
                : '#0f172a',

            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Images
        </button>

      </div>



      {/* GENERAL TAB */}

      {activeTab === 'general' && (

        <div>

          {/* TITLE */}

          <input
            placeholder="Product Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            style={inputStyle}
          />



          {/* SLUG */}

          <input
            placeholder="URL Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
            style={inputStyle}
          />



          {/* CATEGORY */}

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            style={inputStyle}
          >

            <option value="">
              Select Category
            </option>

            {productHierarchy.map((cat) => (

              <option
                key={cat.id}
                value={cat.title}
              >
                {cat.title}
              </option>

            ))}

          </select>



          {/* DESCRIPTION */}

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            style={{
              ...inputStyle,
              height: '220px',
            }}
          />



          {/* STATUS */}

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            style={inputStyle}
          >

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

      )}



      {/* IMAGE TAB */}

      {activeTab === 'images' && (

        <div>

          <h3>
            Existing Images
          </h3>

          <div
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              marginBottom: '30px',
            }}
          >

            {images.map((img, i) => (

              <div
                key={i}
                style={{
                  position: 'relative',
                }}
              >

                <img
                  src={img}
                  width="140"
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                  }}
                />

                <button
                  onClick={() => removeImage(img)}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'red',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>

              </div>

            ))}

          </div>



          {/* NEW IMAGE */}

          <input
            type="file"
            multiple
            onChange={handleNewImages}
          />



          {/* PREVIEW */}

          <div
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              marginTop: '20px',
            }}
          >

            {newImages.map((img, i) => (

              <img
                key={i}
                src={URL.createObjectURL(img)}
                width="140"
                style={{
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              />

            ))}

          </div>

        </div>

      )}



      {/* UPDATE BUTTON */}

      <button
        onClick={handleUpdate}
        style={{
          marginTop: '40px',
          padding: '14px 30px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Update Product
      </button>

    </div>
  );
}



const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '18px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  outline: 'none',
};