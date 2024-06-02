'use client';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropDown';
import { getCookie, removeCookie } from '@/lib/helpers';
import { UserContext } from '@/context/userContext';
import { CartContext } from '@/context/cartContext';

const UserIcon = () => {
  const { token, handleToken } = useContext(UserContext);
  const { handleCart } = useContext(CartContext);
  useEffect(() => {
    const token = getCookie('accessToken');
    console.log(token);
    handleToken(token);
  }, []);
  const handleLogout = () => {
    removeCookie('accessToken');
    handleToken(null);
    handleCart(null);
  };

  if (!token) {
    return (
      <Link
        href="/login"
        type="button"
        className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary"
      >
        <i className="sicon-user"></i>
      </Link>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary">
        <i className="sicon-user"></i>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="hover:bg-grayer-50 cursor-pointer"
          onClick={handleLogout}
        >
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserIcon;
