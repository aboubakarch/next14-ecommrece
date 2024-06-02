import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetails from '@/app/(root)/products/[slug]/page';
import { crypt } from '@/lib/helpers';

describe('ProductDetails', () => {
  const productData = {
    id: 1,
    name: 'Test Product',
    imageURL: '/test-image.jpg',
    price: 100,
    description: 'Test description',
    categoryId: 1,
  };
  it('renders product details correctly when item is provided', async () => {
    const renderProduct = await ProductDetails({
      searchParams: { item: crypt('salt', JSON.stringify(productData)) },
    });

    render(renderProduct);

    // Verify that product details are rendered correctly
    expect(screen.getByText(productData.name)).toBeInTheDocument();
    expect(screen.getByText(`${productData.price} SAR`)).toBeInTheDocument();
    expect(screen.getByText(productData.description)).toBeInTheDocument();
  });

  it('renders "Product not found" message when item is not provided', async () => {
    const renderProduct = await ProductDetails({ searchParams: {} });

    render(renderProduct);

    // Verify that "Product not found" message is rendered
    expect(screen.getByText('المنتج غير موجود')).toBeInTheDocument();
  });
});
