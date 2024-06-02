import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from '@/components/SignInForm';
import Login from '@/app/(auth)/login/page';

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            push: () => null
        };
    }
}));
describe('Sign In Form Validation', () => {
    test('displays error messages with invalid data', async () => {

        render(<Login />);

        fireEvent.change(screen.getByLabelText('البريد الإلكتروني'), {
            target: { value: 'invalid-email' },
        });
        fireEvent.change(screen.getByLabelText('كلمة المرور'), {
            target: { value: '' },
        });

        fireEvent.click(screen.getByText('دخول'));

        expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
        expect(await screen.findByText('Password is required')).toBeInTheDocument();
    });
    test('displays error messages with empty data', async () => {

        render(<Login />);


        fireEvent.click(screen.getByText('دخول'));

        expect(await screen.findByText('Email is required')).toBeInTheDocument();
        expect(await screen.findByText('Password is required')).toBeInTheDocument();
    });


});
