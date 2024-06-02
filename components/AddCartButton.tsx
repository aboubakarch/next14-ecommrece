'use client';
import { CartContext } from '@/context/cartContext';
import { UserContext } from '@/context/userContext';
import HTTPService from '@/services/api';
import React, { useContext, useState } from 'react';
import { toast } from 'sonner';

const AddCartButton: React.FC<AddCartProps> = ({
  productId,
  hasControls = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { token } = useContext(UserContext);
  const { cart, handleCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const addToCart = async () => {
    setLoading(true);
    if (!token) {
      toast.error('الرجاء تسجيل الدخول لإضافة إلى السلة!');
      return;
    }
    try {
      const existingCartItem = cart?.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingCartItem) {
        // Update existing cart item
        const updatedQuantity = existingCartItem.quantity + quantity;
        await HTTPService.getInstance().editCartItem(
          existingCartItem.id,
          { id: existingCartItem.id, productId, quantity: updatedQuantity },
          token
        );
      } else {
        await HTTPService.getInstance().addCartItem(
          { id: 0, productId, quantity: quantity },
          token
        );
      }

      // Fetch updated cart
      const response = await HTTPService.getInstance().getCart(token);
      toast.success('تمت إضافة المنتج!');
      handleCart(response);
    } catch (error) {
      toast.error('فشل في تحديث السلة');

      console.error('فشل في تحديث السلة', error);
    }
    setLoading(false);
  };

  if (hasControls) {
    return (
      <div className="flex items-center justify-center gap-4">
        <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
          <button
            className="shrink-0 px-2 text-md text-gray-500 hover:text-gray-300"
            onClick={incrementQuantity}
          >
            +
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-[50px] flex-1 text-center appearance-none bg-transparent"
          />
          <button
            className="shrink-0 px-2 text-md text-gray-500 hover:text-gray-300"
            onClick={decrementQuantity}
          >
            -
          </button>
        </div>
        <button
          disabled={loading}
          onClick={addToCart}
          type="button"
          className="w-full h-[42px] flex justify-center gap-3 items-center bg-primary text-white flex-1 p-2 text-md rounded-md hover:brightness-75"
        >
          إضافة للسلة
          {loading && <div className="loader_simple" />}
        </button>
      </div>
    );
  }
  return (
    <button
      disabled={loading}
      type="button"
      onClick={addToCart}
      className="w-full bg-primary flex justify-center gap-3 text-white p-2 text-md rounded-md hover:brightness-75"
    >
      إضافة للسلة
      {loading && <div className="loader_small" />}
    </button>
  );
};

export default AddCartButton;
