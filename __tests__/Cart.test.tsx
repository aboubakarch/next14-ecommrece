import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartContext } from '@/context/cartContext';
import Cart from '@/app/(root)/cart/page';

describe('Cart', () => {
    it('renders cart items and total cost correctly', () => {
        // Mock cart context value
        const mockCart = {
            cartItems: [
                { id: 1, quantity: 2, product: { id: 1, name: 'Test Product', price: 50, description: "Test", categoryId: 23, imageURL: "dasda" } },
                { id: 2, quantity: 1, product: { id: 2, name: 'Another Product', price: 30, description: "Test", categoryId: 23, imageURL: "dasda" } },
            ],
            totalCost: 130,
        };

        render(
            <CartContext.Provider value={{ cart: mockCart, handleCart: jest.fn() }}>
                <Cart />
            </CartContext.Provider>
        );

        // Verify that cart items are rendered
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Another Product')).toBeInTheDocument();

        // Verify that total cost is rendered
        expect(screen.getByText(`${mockCart.totalCost} SAR`)).toBeInTheDocument();

        // Verify that "اتمام عملية الدفع" button is rendered
        expect(screen.getByText('اتمام عملية الدفع')).toBeInTheDocument();
    });

    it('renders "0 SAR" for total cost when cart is empty', () => {
        // Mock empty cart
        const mockCart = {
            cartItems: [],
            totalCost: 0,
        };

        render(
            <CartContext.Provider value={{ cart: mockCart, handleCart: jest.fn() }}>
                <Cart />
            </CartContext.Provider>
        );

        // Verify that "0 SAR" is rendered for total cost
        expect(screen.getByText('0 SAR')).toBeInTheDocument();
    });
});
