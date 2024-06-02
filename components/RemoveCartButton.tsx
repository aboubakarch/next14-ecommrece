import { CartContext } from '@/context/cartContext'
import { UserContext } from '@/context/userContext'
import HTTPService from '@/services/api'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'

const RemoveCartButton: React.FC<RemoveCartProps> = ({ itemQuantity, id, productId }) => {
    const [quantity, setQuantity] = useState(itemQuantity)
    const { token } = useContext(UserContext)
    const { cart, handleCart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const [updatedQuantity] = useDebounce(quantity, 300)

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value > 0) {
            setQuantity(value)
        }
    }
    const updateCart = async () => {
        setLoading(true)
        if (!token) {
            toast.error("Please Login to update cart!")
            return
        }
        try {

            // Update existing cart item
            await HTTPService.getInstance().editCartItem(id, { id: id, productId, quantity: updatedQuantity }, token)

            // Fetch updated cart
            const response = await HTTPService.getInstance().getCart(token)
            toast.success("Product Updated!")
            handleCart(response)
        } catch (error) {
            toast.error("Failed to update cart")

            console.error('Failed to update cart', error)
        }
        setLoading(false)

    }
    const deleteCart = async () => {
        setLoading(true)
        if (!token) {
            toast.error("Please Login to delete product!")
            return
        }
        try {

            // Update existing cart item
            await HTTPService.getInstance().deleteCartItem(id, token)

            // Fetch updated cart
            const response = await HTTPService.getInstance().getCart(token)
            toast.success("Product Deleted!")
            handleCart(response)
        } catch (error) {
            toast.error("Failed to update cart")

            console.error('Failed to update cart', error)
        }
        setLoading(false)

    }
    useEffect(() => {
        if (updatedQuantity !== itemQuantity) {
            updateCart()
        }
    }, [updatedQuantity])

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
            <button disabled={loading} onClick={deleteCart} type="button" className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1 hover:brightness-75">
                <i className="sicon-trash"></i>
            </button>
        </div>)
}

export default RemoveCartButton