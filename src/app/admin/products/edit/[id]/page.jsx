'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductEditor from '@/components/admin/ProductEditor';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/product?id=${id}`, { cache: 'no-store' });
        const result = await res.json();

        if (active) {
          setProduct(result.success ? result.data : null);
        }
      } catch (err) {
        console.error('Unable to fetch product:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);


  const handleUpdate = async (formData) => {
    const res = await fetch('/api/product', {
      method: 'PUT',
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      alert('Product updated successfully');
    }

    return result;
  };

  if (loading) {
    return <div style={{ padding: '30px' }}>Loading product...</div>;
  }

  if (!product) {
    return <div style={{ padding: '30px' }}>Product not found.</div>;
  }

  return (
    <ProductEditor
      key={product._id}
      mode="edit"
      initialProduct={product}
      onSubmit={handleUpdate}
      onSaved={() => router.push('/admin/products')}
    />
  );
}
