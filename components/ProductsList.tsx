'use client';
import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import LoadMore from './LoadMore';
import { FilterContext } from '@/context/filterContext';

const ProductsList: React.FC<LoadMoreProps> = ({ products }) => {
  const {
    filters: { range, search },
  } = useContext(FilterContext);
  return (
    <>
      {/* these are for initial render */}
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
        {!search &&
          !range &&
          products
            .slice(0, 8)
            .map((product, index) => (
              <ProductCard key={product.id} index={index} {...product} />
            ))}
      </div>
      <LoadMore products={products} />
    </>
  );
};

export default ProductsList;
