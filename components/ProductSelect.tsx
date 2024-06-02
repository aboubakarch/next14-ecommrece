'use client';
import { FilterContext } from '@/context/filterContext';
import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const ProductSelect = () => {
  //we can use the filters state from context directly in place of this use State but i have added debounce to imitate real scenaria
  const [priceRange, setPriceRange] = useState('all');
  const [pricing] = useDebounce(priceRange, 400);
  const { handleFilters } = useContext(FilterContext);

  const handlePriceRangeChange = (event: any) => {
    setPriceRange(event.target.value);
  };

  useEffect(() => {
    handleFilters({ range: pricing === 'all' ? null : pricing }); // Update filters with the debounced query
  }, [pricing]);

  return (
    <div className="flex flex-col gap-1 shrink-0 sm:min-w-[180px]">
      <label htmlFor="priceRange" className="hidden">
        اختر نطاق السعر
      </label>
      <select
        onChange={handlePriceRangeChange}
        defaultValue={'all'}
        id="priceRange"
        name="priceRange"
        className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-1"
      >
        <option value="all">الكل</option>
        <option value="under_1000">أقل من 1000</option>
        <option value="1000_2000">1000 - 2000</option>
        <option value="2000_3000">2000 - 3000</option>
        <option value="3000_more">3000 أكثر من</option>
      </select>
    </div>
  );
};

export default ProductSelect;
