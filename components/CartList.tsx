'use client';
import { CartContext } from '@/context/cartContext';
import React, { useContext } from 'react';
import CartListItem from './CartListItem';

const CartList = () => {
  const { cart } = useContext(CartContext);

  if (!cart?.cartItems || cart?.cartItems?.length === 0) {
    return <div>لا توجد منتجات في السلة</div>;
  }

  return (
    <ul className="flex flex-col">
      {cart.cartItems.map((item) => (
        <CartListItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default CartList;
