import ProductCard from '@/components/ProductCard';
import { fireEvent, render, screen } from '@testing-library/react';
import HTTPService from '@/services/api';
import AddCartButton from '@/components/AddCartButton';
import { AppContextProvider } from '@/context/provider';
import { UserContext } from '@/context/userContext';
import { CartContext } from '@/context/cartContext';


describe('ProductCard', () => {
    const token = 'mock-token';
    const productId = 1342;

    const product = {
        categoryId: 11,
        description: 'Test description',
        id: 100,
        imageURL: '/assets/slider/01.png',
        name: 'Test Product',
        price: 100,
    };


    test('renders product card correctly', () => {
        render(<ProductCard {...product} index={0} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getAllByText('100 SAR')[0]).toBeInTheDocument();
    });
    test('falls back to default image if imageURL is invalid', () => {
        const productWithInvalidImage = { ...product, imageURL: 'invalid-url' };
        render(<ProductCard {...productWithInvalidImage} index={0} />);

        expect(screen.getByAltText('product')).toHaveAttribute('src', '/_next/image?url=%2Fassets%2Fslider%2F01.png&w=3840&q=75');
    });

    test('displays correct price', () => {
        render(<ProductCard {...product} index={0} />);

        expect(screen.getAllByText('100 SAR')[0]).toBeInTheDocument();
        expect(screen.getAllByText('100 SAR')[0]).toHaveClass('font-medium text-md');
    });


    test('renders add to cart button without controls', () => {
        render(
            <AppContextProvider>
                <AddCartButton productId={productId} />
            </AppContextProvider>
        );

        expect(screen.getByRole('button', { name: /إضافة للسلة/i })).toBeInTheDocument();
    });

    test('quantity controls increment', () => {
        render(<AddCartButton productId={productId} hasControls />);
        const incrementButton = screen.getByRole('button', { name: /\+/i });

        fireEvent.click(incrementButton);
        expect(screen.getByRole('spinbutton')).toHaveValue(2);
    });

    test('quantity controls decrement', () => {
        render(<AddCartButton productId={productId} hasControls />);
        const decrementButton = screen.getByRole('button', { name: /-/i });

        fireEvent.click(decrementButton);
        expect(screen.getByRole('spinbutton')).toHaveValue(1);
    });

    test('add to cart button click', async () => {
        render(
            <UserContext.Provider value={{ token, handleToken: jest.fn() }}>
                <CartContext.Provider value={{ cart: null, handleCart: jest.fn() }}>
                    <AddCartButton productId={productId} />
                </CartContext.Provider>
            </UserContext.Provider>
        );

        const addToCartButton = screen.getByRole('button', { name: /إضافة للسلة/i });
        fireEvent.click(addToCartButton);


    });

});
