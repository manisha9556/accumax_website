'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';

export default function AddProduct() {

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
  });

  const [images, setImages] = useState([]);

  // ✅ SUBMIT
  const handleSubmit = async () => {
    if (
  !form.title ||
  !form.slug ||
  !form.category ||
  !form.description
) {
  alert("Please fill all fields");
  return;
}

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("category", form.category);
    formData.append("description", form.description);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {

      const res = await fetch('/api/product', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (result.success) {

        alert("✅ Product Added Successfully");

        setForm({
          title: '',
          slug: '',
          category: '',
          description: '',
        });

        setImages([]);

      } else {

        alert("❌ Failed");

      }

    } catch (err) {

      console.error(err);
      alert("❌ Server Error");

    }
  };

  return (

    <div
      style={{
        padding: '25px',
        maxWidth: '750px',
      }}
    >

      <h1
        style={{
          marginBottom: '25px',
          fontSize: '32px',
          fontWeight: '700',
        }}
      >
        Add Product
      </h1>

      {/* TITLE */}
     <input
  placeholder="Product Title"
  value={form.title}
  onChange={(e) => {

    const value = e.target.value;

    setForm({
      ...form,

      title: value,

      slug: value
        .toLowerCase()
        .replaceAll(" ", "-")
        .replace(/[^\w-]+/g, "")
    });
  }}
  style={{
    width: '100%',
    padding: '14px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  }}
/>

      {/* SLUG */}
      <input
        placeholder="URL Slug"
        value={form.slug}
        onChange={(e) =>
          setForm({
            ...form,
            slug: e.target.value
          })
        }
        style={{
          width: '100%',
          padding: '14px',
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
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
          width: '100%',
          padding: '14px',
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          background: '#fff'
        }}
      >

        <option value="">
          Select Category
        </option>

        {categories.map((cat, i) => (

          <option
            key={i}
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
            description: e.target.value
          })
        }
        style={{
          width: '100%',
          height: '180px',
          padding: '14px',
          marginBottom: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
      />

      {/* IMAGE */}
      <input
        type="file"
        multiple
        onChange={(e) =>
          setImages([...e.target.files])
        }
      />

      <br />
      <br />

      {/* PREVIEW */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}
      >

        {images.map((img, i) => (

          <img
            key={i}
            src={URL.createObjectURL(img)}
            width="100"
            height="100"
            alt="preview"
            style={{
              borderRadius: '8px',
              objectFit: 'cover',
              border: '1px solid #ddd'
            }}
          />

        ))}

      </div>

      <br />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        style={{
          background: '#2563eb',
          color: 'white',
          padding: '14px 28px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Submit Product
      </button>

    </div>
  );
}








// 'use client';

// import { useState } from 'react';
// import { categories } from "@/data/categories";

// export default function AddProduct() {

//   const [form, setForm] = useState({
//     title: '',
//     slug: '',
//     category: '',
//     description: '',
//   });

//   const [images, setImages] = useState([]);

//   // SUBMIT
//   const handleSubmit = async () => {

//     const formData = new FormData();

//     formData.append("title", form.title);
//     formData.append("slug", form.slug);
//     formData.append("category", form.category);
//     formData.append("description", form.description);

//     images.forEach((img) => {
//       formData.append("images", img);
//     });

//     try {

//       const res = await fetch('/api/product', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await res.json();

//       if (result.success) {

//         alert("✅ Product Added");

//         setForm({
//           title: '',
//           slug: '',
//           category: '',
//           description: '',
//         });

//         setImages([]);
//       }

//       else {
//         alert("❌ Failed");
//       }

//     } catch (error) {
//       console.log(error);
//       alert("❌ Server Error");
//     }
//   };

//   return (

//     <div style={{
//       padding: '20px',
//       maxWidth: '700px'
//     }}>

//       <h1 style={{
//         marginBottom: '20px'
//       }}>
//         Add Product
//       </h1>

//       {/* TITLE */}

//       <input
//         placeholder="Product Title"
//         value={form.title}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             title: e.target.value
//           })
//         }
//         style={{
//           width: '100%',
//           padding: '12px',
//           marginBottom: '15px'
//         }}
//       />

//       {/* SLUG */}

//       <input
//         placeholder="URL Slug"
//         value={form.slug}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             slug: e.target.value
//           })
//         }
//         style={{
//           width: '100%',
//           padding: '12px',
//           marginBottom: '15px'
//         }}
//       />

//       {/* CATEGORY */}

//       <select
//         value={form.category}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             category: e.target.value
//           })
//         }
//         style={{
//           width: '100%',
//           padding: '12px',
//           marginBottom: '15px'
//         }}
//       >

//         <option value="">
//           Select Category
//         </option>

//         {categories.map((cat, i) => (

//           <option
//             key={i}
//             value={cat.title}
//           >
//             {cat.title}
//           </option>

//         ))}

//       </select>

//       {/* DESCRIPTION */}

//       <textarea
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) =>
//           setForm({
//             ...form,
//             description: e.target.value
//           })
//         }
//         style={{
//           width: '100%',
//           height: '180px',
//           padding: '12px',
//           marginBottom: '15px'
//         }}
//       />

//       {/* IMAGE */}

//       <input
//         type="file"
//         multiple
//         onChange={(e) =>
//           setImages([...e.target.files])
//         }
//       />

//       <br /><br />

//       {/* PREVIEW */}

//       <div style={{
//         display: 'flex',
//         gap: '10px',
//         flexWrap: 'wrap'
//       }}>

//         {images.map((img, i) => (

//           <img
//             key={i}
//             src={URL.createObjectURL(img)}
//             width="90"
//             style={{
//               borderRadius: '6px',
//               border: '1px solid #ddd'
//             }}
//           />

//         ))}

//       </div>

//       <br />

//       {/* BUTTON */}

//       <button
//         onClick={handleSubmit}
//         style={{
//           background: '#2563eb',
//           color: 'white',
//           padding: '12px 25px',
//           border: 'none',
//           borderRadius: '6px',
//           cursor: 'pointer'
//         }}
//       >
//         Submit Product
//       </button>

//     </div>
//   );
// }