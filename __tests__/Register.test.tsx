import { render, screen, fireEvent } from '@testing-library/react';
import Register from '@/app/(auth)/register/page';

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: () => null
        };
    }
}));
describe('Sign In Form Validation', () => {
    test('renders form fields and buttons', () => {
        const { getByLabelText, getByText } = render(<Register />);
        expect(getByLabelText('الاسم الأول')).toBeInTheDocument();
        expect(getByLabelText('الاسم الأخير')).toBeInTheDocument();
        expect(getByLabelText('البريد الإلكتروني')).toBeInTheDocument();
        expect(getByLabelText('كلمة المرور')).toBeInTheDocument();
        expect(getByText('سجل')).toBeInTheDocument();
        expect(getByText('لديك حساب بالفعل')).toBeInTheDocument();
    });
    test('submits form with valid data', async () => {
        const { getByLabelText, getByText } = render(<Register />);
        const firstNameInput = getByLabelText('الاسم الأول');
        const lastNameInput = getByLabelText('الاسم الأخير');
        const emailInput = getByLabelText('البريد الإلكتروني');
        const passwordInput = getByLabelText('كلمة المرور');
        const submitButton = getByText('سجل');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

    });
    test('displays error messages with invalid data', async () => {


        const { getByLabelText, getByText } = render(<Register />);
        const firstNameInput = getByLabelText('الاسم الأول');
        const lastNameInput = getByLabelText('الاسم الأخير');
        const emailInput = getByLabelText('البريد الإلكتروني');
        const passwordInput = getByLabelText('كلمة المرور');
        const submitButton = getByText('سجل');

        fireEvent.change(firstNameInput, { target: { value: 'Jhn' } });
        fireEvent.change(lastNameInput, { target: { value: 'Do' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.click(submitButton);


        expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
        expect(await screen.findByText('Last name must be at least 4 characters')).toBeInTheDocument();
        expect(await screen.findByText('First name must be at least 4 characters')).toBeInTheDocument();
        expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
    });



});
