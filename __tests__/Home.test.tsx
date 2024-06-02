import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getProducts } from '@/app/action'; // Update the path as needed
import Home from '@/app/(root)/(home)/page';
import { AppContextProvider } from '@/context/provider';
jest.mock('use-debounce', () => ({
    useDebounce: jest.fn(value => [value, jest.fn()]),
}));

const mockProducts = [
    {
        id: 1,
        name: "Product 1",
        imageURL: "https://example.com/product1.jpg",
        price: 100,
        description: "Description of Product 1",
        categoryId: 1,
    },
    {
        id: 2,
        name: "Product 2",
        imageURL: "https://example.com/product2.jpg",
        price: 324234223,
        description: "Description of Product 2",
        categoryId: 2,
    },
];

jest.mock('../app/action', () => ({
    getProducts: jest.fn<Promise<Product[]>, []>(() => {
        return Promise.resolve(mockProducts);
    }),
}));


describe('Home component', () => {


    it('renders the Home component with products', async () => {
        // Mock the getProducts function to return mock products
        const renderedHome = await Home()
        // Render the Home component
        const { getByText } = render(renderedHome);

        // Wait for the products to be loaded
        await waitFor(() => {
            // Check if the product names are rendered
            expect(getByText('Product 1')).toBeInTheDocument();
            expect(getByText('Product 2')).toBeInTheDocument();
            // Add more assertions as needed
        });
    });

    it('renders the Home component without products', async () => {
        // Mock the getProducts function to return an empty array
        const renderedHome = await Home()

        // Render the Home component
        const { getByText } = render(renderedHome);

        // Wait for the products to be loaded
        await waitFor(() => {
            // Check if a message for no products is rendered
            expect(getByText('No Products Found')).toBeInTheDocument();
        });
    });

    it('test the search component', async () => {
        // Mock the getProducts function to return mock products
        const renderedHome = await Home()
        // Render the Home component
        const { getByText, getByPlaceholderText, queryByText } = render(
            <AppContextProvider>
                {renderedHome}
            </AppContextProvider>
        );
        const searchInput = getByPlaceholderText('ادخل اسم المنتج...');
        fireEvent.change(searchInput, { target: { value: 'Product 1' } });


        // Wait for the products to be loaded
        await waitFor(() => {
            // Check if the product names are rendered
            expect(getByText('Product 1')).toBeInTheDocument();
            expect(queryByText('Product 2')).toBeNull();
            // Add more assertions as needed
        });
    });
    it('test the select component', async () => {
        // Mock the getProducts function to return mock products
        const renderedHome = await Home()
        // Render the Home component
        const { getByText, getByLabelText, queryByText } = render(
            <AppContextProvider>
                {renderedHome}
            </AppContextProvider>
        );
        // Select an option
        const selectElement = getByLabelText('اختر نطاق السعر');
        fireEvent.change(selectElement, { target: { value: '3000_more' } });


        // Wait for the products to be loaded
        await waitFor(() => {
            // Check if the product names are rendered
            expect(queryByText('Product 1')).toBeNull();
            expect(getByText('Product 2')).toBeInTheDocument();
            // Add more assertions as needed
        });
    });
    it('test the filter to check produucts not found', async () => {
        // Mock the getProducts function to return mock products
        const renderedHome = await Home()
        // Render the Home component
        const { getByText, getByLabelText, queryByText } = render(
            <AppContextProvider>
                {renderedHome}
            </AppContextProvider>
        );
        // Select an option
        const selectElement = getByLabelText('اختر نطاق السعر');
        fireEvent.change(selectElement, { target: { value: '1000_2000' } });


        // Wait for the products to be loaded
        await waitFor(() => {
            // Check if the product names are rendered
            expect(queryByText('Product 1')).toBeNull();
            expect(queryByText('Product 2')).toBeNull();
            // Add more assertions as needed
        });
    });
});
