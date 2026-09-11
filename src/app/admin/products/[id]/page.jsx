'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminData } from '@/context/admin/AdminDataContext';
import { ProductDetailsView } from '@/components/admin/products/ProductDetailsView';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { products } = useAdminData();

  const product = products.find((p) => String(p.id) === String(params.id));

  return (
    <ProductDetailsView
      product={product}
      onBack={() => router.push('/admin/products')}
    />
  );
}
