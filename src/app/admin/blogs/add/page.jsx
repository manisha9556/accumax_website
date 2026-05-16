'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


export default function AddBlog() {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
  });

  const [images, setImages] = useState([]);

  // 📥 FETCH CATEGORY
  useEffect(() => {
    fetch('/api/blog-category')
      .then(res => res.json())
      .then(data => setCategories(data.data || []));
  }, []);

  // 📤 SUBMIT FUNCTION
  const handleSubmit = async () => {

    // 🔴 VALIDATION
    if (!form.title || !form.category || !form.description) {
      toast.error("Please fill all fields ❌");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);

    images.forEach(img => {
      formData.append("images", img);
    });

    try {
      // 🔄 LOADING TOAST
      const loadingToast = toast.loading("Uploading blog...");

      const res = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Blog added successfully 🎉");

        // ✅ RESET FORM
        setForm({
          title: '',
          category: '',
          description: '',
        });

        setImages([]);
      } else {
        toast.error("Failed to add blog ❌");
      }

    } catch (error) {
      toast.error("Server error ❌");
    }
  };

//   const categories = [
//   "Air Shower",
//   "Pass Box",
//   "Garment Storage Sterile Cabinet",
//   "Sampling / Dispensing Booth",
//   "Cross Over Bench",
//   "Laminar Air Flow Cabinet",
//   "Biosafety Cabinet",
//   "Portable Clean Room",
//   "ESD Storage Cabinet Anti Static",
//   "Fume Hood",
//   "Ductless Fume Hood"
// ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add Blog</h1>

      {/* TITLE */}
      <input
        placeholder="Enter blog title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={{ display: 'block', marginBottom: '15px', padding: '8px', width: '300px' }}
      />

      {/* CATEGORY */}
  <select
  value={form.category}
  onChange={(e) =>
    setForm({
      ...form,
      category: e.target.value
    })
  }
  style={{
    display: 'block',
    marginBottom: '15px',
    padding: '8px',
    width: '300px'
  }}
>

  <option value="">
    Select Category
  </option>

  {categories.map((cat) => (

    <option
      key={cat._id}
      value={cat._id}
    >
      {cat.name}
    </option>

  ))}

</select>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Enter description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ display: 'block', marginBottom: '15px', padding: '8px', width: '300px' }}
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
        style={{ marginBottom: '15px' }}
      />

      {/* PREVIEW */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={URL.createObjectURL(img)}
            width="60"
            style={{ borderRadius: '6px' }}
          />
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 20px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </div>
  );
}








