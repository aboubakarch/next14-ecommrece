"use client"
import { createContext, useState } from "react";


//default values
export const cartContextDefault: CartContextData = {
    cart: null,
    handleCart: (cart: Cart | null) => { }
};

//provider
export const CartContext = createContext<CartContextData>(
    cartContextDefault
);

//hooks that components can use to change the values
export function useCartContextValue(): CartContextData {
    const [cart, setCart] = useState<Cart | null>(null);

    const handleCart = (cart: Cart | null) => {
        setCart(cart)
    };

    return {
        cart,
        handleCart,
    };
}


export const CartContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const cart = useCartContextValue()
    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
};