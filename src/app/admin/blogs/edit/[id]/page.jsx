'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    status: 'Active'
  });

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);        // existing images
  const [newImages, setNewImages] = useState([]);  // new upload

  // 🔥 LOAD DATA
  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const blog = data.data.find(item => item._id === id);

        if (blog) {
          setForm({
            title: blog.title,
            category: blog.category || '',
            description: blog.description,
            status: blog.status
          });

          setImages(blog.images || []);
        }
      });

    fetch('/api/blog-category')
      .then(res => res.json())
      .then(data => setCategories(data.data || []));

  }, [id]);

  // ❌ REMOVE EXISTING IMAGE
  const removeImage = (img) => {
    setImages(prev => prev.filter(i => i !== img));
  };

  // ➕ ADD NEW IMAGES
  const handleNewImages = (e) => {
    setNewImages([...e.target.files]);
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("status", form.status);

    // ✅ IMPORTANT: existing images send karo
    formData.append("existingImages", JSON.stringify(images));

    // ✅ new images
    newImages.forEach(img => {
      formData.append("images", img);
    });

    try {
      const res = await fetch('/api/blog', {
        method: 'PUT',
        body: formData
      });

      const result = await res.json();
      console.log("UPDATE RESPONSE 👉", result);

      if (result.success) {
        alert("✅ Blog Updated Successfully");
        router.push('/admin/blogs');
      } else {
        alert("❌ Update Failed");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server Error");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>Edit Blog</h1>

      {/* TITLE */}
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={{ width: '100%', padding: '10px' }}
      />

      <br /><br />

      {/* CATEGORY */}
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        style={{ width: '100%', padding: '10px' }}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ width: '100%', height: '120px', padding: '10px' }}
      />

      <br /><br />

      {/* STATUS */}
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        style={{ width: '100%', padding: '10px' }}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <br /><br />

      {/* EXISTING IMAGES */}
      <h3>Existing Images</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img src={img} width="100" style={{ borderRadius: '6px' }} />
            <button
              onClick={() => removeImage(img)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <br />

      {/* NEW IMAGE UPLOAD */}
      <input type="file" multiple onChange={handleNewImages} />

      <br /><br />

      {/* BUTTON */}
      <button
        onClick={handleUpdate}
        style={{
          background: '#2563eb',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Update Blog
      </button>
    </div>
  );
}