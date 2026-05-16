'use client';

import ProductEditor from '@/components/admin/ProductEditor';

export default function AddProduct() {
  const handleCreate = async (formData) => {
    const res = await fetch('/api/product', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      alert('Product added successfully');
    }

    return result;
  };

  return <ProductEditor key="create-product" mode="create" onSubmit={handleCreate} />;
}
