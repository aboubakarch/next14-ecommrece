"use client"
import CartList from '@/components/CartList'
import { CartContext } from '@/context/cartContext'
import React, { useContext } from 'react'

const Cart = () => {
    const { cart } = useContext(CartContext)
    return (
        <main className="w-full main flex-auto flex justify-center">
            <div className="container">
                <div className="p-4 bg-white rounded-lg shadow-4xl">
                    <div className="flex flex-col mb-6">
                        <h2 className="text-lg flex items-center justify-start gap-2">سلة المشتريات</h2>
                    </div>
                    <CartList />
                    <div className="flex items-center justify-between px-4 py-8 border-gray-100 border-t border-b-1">
                        <h3 className="font-bold text-xl">اجمالي السلة</h3>
                        <span className="text-xl font-bold">{cart?.totalCost || 0} SAR</span>
                    </div>
                    <button type="button" className="w-full bg-primary text-white p-3 text-md rounded-md">اتمام عملية الدفع</button>
                </div>
            </div>
        </main>

    )
}

export default Cart