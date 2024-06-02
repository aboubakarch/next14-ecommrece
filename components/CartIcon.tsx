"use client"
import { CartContext } from '@/context/cartContext'
import { UserContext } from '@/context/userContext'
import HTTPService from '@/services/api'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner'

const CartIcon = () => {
    const { cart, handleCart } = useContext(CartContext)
    const { token } = useContext(UserContext)

    const fetchCart = async () => {
        try {
            const data = await HTTPService.getInstance().getCart(token || "")
            handleCart(data)
            console.log(data)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }
    useEffect(() => {
        console.log("Checking", token)
        if (token) {
            fetchCart()
        }
    }, [token])

    return (
        <div className='relative'>
            {cart?.cartItems && (
                <div className='bg-black text-white text-center -top-2 -right-2 rounded-full h-6 w-6 text-sm absolute z-50'>
                    {cart?.cartItems?.length || 0}
                </div>
            )}
            <Link href="/cart" type="button" className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary">
                <i className="sicon-shopping-bag"></i>
            </Link>
        </div>
    )
}

export default CartIcon