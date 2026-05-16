'use client';

import { useEffect, useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '18px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  outline: 'none',
  background: '#fff',
};

const tabButtonStyle = (isActive) => ({
  padding: '12px 20px',
  background: isActive ? '#2563eb' : '#e2e8f0',
  color: isActive ? 'white' : '#0f172a',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 600,
});

const createEmptySpecification = () => ({ label: '', value: '' });

const createInitialForm = (product) => ({
  title: product?.title || '',
  menuTitle: product?.menuTitle || '',
  slug: product?.slug || '',
  slugPath: product?.slugPath || '',
  categoryId: product?.categoryId || '',
  category: product?.category || '',
  description: product?.description || '',
  eyebrow: product?.eyebrow || 'Cleanroom Equipment',
  lead: product?.lead || '',
  overviewTitle: product?.overviewTitle || '',
  overviewParagraphs:
    product?.overviewParagraphs?.length > 0
      ? product.overviewParagraphs
      : product?.description
        ? [product.description]
        : [''],
  specifications:
    product?.specifications?.length > 0
      ? product.specifications
      : [createEmptySpecification()],
  features: product?.features?.length > 0 ? product.features : [''],
  applications: product?.applications?.length > 0 ? product.applications : [''],
  metaTitle: product?.metaTitle || '',
  metaDescription: product?.metaDescription || '',
  status: product?.status || 'Active',
  showInMenu: product?.showInMenu ?? true,
  order: product?.order ?? 0,
});

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function ProductEditor({
  initialProduct,
  mode = 'create',
  onSubmit,
  onSaved,
}) {
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm] = useState(createInitialForm(initialProduct));
  const [categories, setCategories] = useState([]);
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingHeroImage, setExistingHeroImage] = useState(initialProduct?.heroImage || '');
  const [existingImages, setExistingImages] = useState(initialProduct?.images || []);
  const [submitting, setSubmitting] = useState(false);

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
      }
    };

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  const setCategory = (categoryId) => {
    const selected = categories.find((item) => item._id === categoryId);

    setForm((prev) => ({
      ...prev,
      categoryId,
      category: selected?.title || '',
    }));
  };

  const updateStringArray = (field, index, value) => {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = value;

      return {
        ...prev,
        [field]: next,
      };
    });
  };

  const addStringArrayItem = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeStringArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        prev[field].length > 1
          ? prev[field].filter((_, itemIndex) => itemIndex !== index)
          : [''],
    }));
  };

  const updateSpecification = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.specifications];
      next[index] = {
        ...next[index],
        [key]: value,
      };

      return {
        ...prev,
        specifications: next,
      };
    });
  };

  const addSpecification = () => {
    setForm((prev) => ({
      ...prev,
      specifications: [...prev.specifications, createEmptySpecification()],
    }));
  };

  const removeSpecification = (index) => {
    setForm((prev) => ({
      ...prev,
      specifications:
        prev.specifications.length > 1
          ? prev.specifications.filter((_, itemIndex) => itemIndex !== index)
          : [createEmptySpecification()],
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.slugPath || !form.categoryId || !form.description) {
      alert('Please fill the required general details first.');
      setActiveTab('general');
      return;
    }

    const formData = new FormData();

    if (mode === 'edit' && initialProduct?._id) {
      formData.append('id', initialProduct._id);
    }

    formData.append('title', form.title);
    formData.append('menuTitle', form.menuTitle);
    formData.append('slug', form.slug);
    formData.append('slugPath', form.slugPath);
    formData.append('categoryId', form.categoryId);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('eyebrow', form.eyebrow);
    formData.append('lead', form.lead);
    formData.append('overviewTitle', form.overviewTitle);
    formData.append('metaTitle', form.metaTitle);
    formData.append('metaDescription', form.metaDescription);
    formData.append('status', form.status);
    formData.append('showInMenu', String(form.showInMenu));
    formData.append('order', String(form.order || 0));
    formData.append('existingHeroImage', existingHeroImage || '');
    formData.append('existingImages', JSON.stringify(existingImages));
    formData.append(
      'overviewParagraphs',
      JSON.stringify(form.overviewParagraphs.map((item) => item.trim()).filter(Boolean))
    );
    formData.append(
      'specifications',
      JSON.stringify(
        form.specifications.filter((item) => item.label.trim() && item.value.trim())
      )
    );
    formData.append(
      'features',
      JSON.stringify(form.features.map((item) => item.trim()).filter(Boolean))
    );
    formData.append(
      'applications',
      JSON.stringify(form.applications.map((item) => item.trim()).filter(Boolean))
    );

    if (heroImageFile) {
      formData.append('heroImage', heroImageFile);
    }

    galleryFiles.forEach((file) => {
      formData.append('images', file);
    });

    setSubmitting(true);

    try {
      const result = await onSubmit(formData);

      if (!result?.success) {
        alert(result?.message || 'Unable to save product');
        return;
      }

      if (mode === 'create') {
        setForm(createInitialForm());
        setExistingHeroImage('');
        setExistingImages([]);
        setHeroImageFile(null);
        setGalleryFiles([]);
        setActiveTab('general');
      }

      if (onSaved) {
        onSaved(result.data);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1100px' }}>
      <h1 style={{ marginBottom: '25px', fontSize: '32px', fontWeight: 700 }}>
        {mode === 'edit' ? 'Edit Product' : 'Add Product'}
      </h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button style={tabButtonStyle(activeTab === 'general')} onClick={() => setActiveTab('general')}>
          General
        </button>
        <button style={tabButtonStyle(activeTab === 'content')} onClick={() => setActiveTab('content')}>
          Content
        </button>
        <button style={tabButtonStyle(activeTab === 'specifications')} onClick={() => setActiveTab('specifications')}>
          Specifications
        </button>
        <button style={tabButtonStyle(activeTab === 'images')} onClick={() => setActiveTab('images')}>
          Images
        </button>
        <button style={tabButtonStyle(activeTab === 'seo')} onClick={() => setActiveTab('seo')}>
          SEO
        </button>
      </div>

      {activeTab === 'general' && (
        <div>
          <input
            placeholder="Product Title"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value;

              setForm((prev) => ({
                ...prev,
                title,
                slug: prev.slug || slugify(title),
                slugPath: prev.slugPath || slugify(title),
                menuTitle: prev.menuTitle || title,
              }));
            }}
            style={inputStyle}
          />

          <input
            placeholder="Menu Title (shown in navbar)"
            value={form.menuTitle}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                menuTitle: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <input
            placeholder="URL Slug"
            value={form.slug}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                slug: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <input
            placeholder="Slug Path (example: pass-box/dynamic/straight-doors)"
            value={form.slugPath}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                slugPath: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <select
            value={form.categoryId}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Short Description / Summary"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            style={{ ...inputStyle, minHeight: '140px' }}
          />

          <input
            placeholder="Eyebrow text"
            value={form.eyebrow}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                eyebrow: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Lead paragraph"
            value={form.lead}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                lead: e.target.value,
              }))
            }
            style={{ ...inputStyle, minHeight: '120px' }}
          />

          <input
            type="number"
            placeholder="Menu / listing order"
            value={form.order}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                order: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
            style={inputStyle}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <input
              type="checkbox"
              checked={form.showInMenu}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  showInMenu: e.target.checked,
                }))
              }
            />
            Show in navbar product menu
          </label>
        </div>
      )}

      {activeTab === 'content' && (
        <div>
          <input
            placeholder="Overview section title"
            value={form.overviewTitle}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                overviewTitle: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <h3 style={{ marginBottom: '15px' }}>Overview Paragraphs</h3>

          {form.overviewParagraphs.map((paragraph, index) => (
            <div key={`overview-${index}`} style={{ marginBottom: '14px' }}>
              <textarea
                placeholder={`Overview paragraph ${index + 1}`}
                value={paragraph}
                onChange={(e) => updateStringArray('overviewParagraphs', index, e.target.value)}
                style={{ ...inputStyle, minHeight: '110px', marginBottom: '8px' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={tabButtonStyle(false)} onClick={() => addStringArrayItem('overviewParagraphs')}>
                  Add Paragraph
                </button>
                <button style={tabButtonStyle(false)} onClick={() => removeStringArrayItem('overviewParagraphs', index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 style={{ margin: '25px 0 15px' }}>Features</h3>
          {form.features.map((feature, index) => (
            <div key={`feature-${index}`} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <input
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => updateStringArray('features', index, e.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <button style={tabButtonStyle(false)} onClick={() => addStringArrayItem('features')}>
                +
              </button>
              <button style={tabButtonStyle(false)} onClick={() => removeStringArrayItem('features', index)}>
                -
              </button>
            </div>
          ))}

          <h3 style={{ margin: '25px 0 15px' }}>Applications</h3>
          {form.applications.map((application, index) => (
            <div key={`application-${index}`} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <input
                placeholder={`Application ${index + 1}`}
                value={application}
                onChange={(e) => updateStringArray('applications', index, e.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <button style={tabButtonStyle(false)} onClick={() => addStringArrayItem('applications')}>
                +
              </button>
              <button style={tabButtonStyle(false)} onClick={() => removeStringArrayItem('applications', index)}>
                -
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'specifications' && (
        <div>
          <h3 style={{ marginBottom: '15px' }}>Technical Specifications</h3>
          {form.specifications.map((specification, index) => (
            <div
              key={`specification-${index}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr auto auto',
                gap: '10px',
                alignItems: 'start',
                marginBottom: '12px',
              }}
            >
              <input
                placeholder="Label"
                value={specification.label}
                onChange={(e) => updateSpecification(index, 'label', e.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <textarea
                placeholder="Value"
                value={specification.value}
                onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                style={{ ...inputStyle, minHeight: '70px', marginBottom: 0 }}
              />
              <button style={tabButtonStyle(false)} onClick={addSpecification}>
                +
              </button>
              <button style={tabButtonStyle(false)} onClick={() => removeSpecification(index)}>
                -
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'images' && (
        <div>
          <h3 style={{ marginBottom: '12px' }}>Hero Image</h3>

          {existingHeroImage && !heroImageFile && (
            <div style={{ marginBottom: '18px' }}>
              <img
                src={existingHeroImage}
                alt="Current hero"
                width="220"
                style={{ borderRadius: '12px', border: '1px solid #ddd', objectFit: 'cover' }}
              />
            </div>
          )}

          {heroImageFile && (
            <div style={{ marginBottom: '18px' }}>
              <img
                src={URL.createObjectURL(heroImageFile)}
                alt="New hero preview"
                width="220"
                style={{ borderRadius: '12px', border: '1px solid #ddd', objectFit: 'cover' }}
              />
            </div>
          )}

          <input type="file" accept="image/*" onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)} />

          <h3 style={{ margin: '30px 0 12px' }}>Gallery Images</h3>

          {existingImages.length > 0 && (
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '18px' }}>
              {existingImages.map((img) => (
                <div key={img} style={{ position: 'relative' }}>
                  <img
                    src={img}
                    alt="Existing gallery"
                    width="140"
                    style={{ borderRadius: '8px', border: '1px solid #ddd', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => setExistingImages((prev) => prev.filter((item) => item !== img))}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: 'none',
                      background: '#ef4444',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))}
          />

          {galleryFiles.length > 0 && (
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
              {galleryFiles.map((img, index) => (
                <img
                  key={`${img.name}-${index}`}
                  src={URL.createObjectURL(img)}
                  alt="Gallery preview"
                  width="140"
                  style={{ borderRadius: '8px', border: '1px solid #ddd', objectFit: 'cover' }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'seo' && (
        <div>
          <input
            placeholder="Meta title"
            value={form.metaTitle}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                metaTitle: e.target.value,
              }))
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Meta description"
            value={form.metaDescription}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                metaDescription: e.target.value,
              }))
            }
            style={{ ...inputStyle, minHeight: '140px' }}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          marginTop: '40px',
          padding: '14px 30px',
          background: submitting ? '#94a3b8' : '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: submitting ? 'not-allowed' : 'pointer',
          fontWeight: '600',
        }}
      >
        {submitting ? 'Saving...' : mode === 'edit' ? 'Update Product' : 'Submit Product'}
      </button>
    </div>
  );
}
