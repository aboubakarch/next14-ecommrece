import SignInForm from '@/components/SignInForm'
import React from 'react'

export default function Login() {
    return (
        <div className='w-full h-full'>

            <div
                className="flex flex-col text-center items-center justify-center mb-6"
            >
                <h2 className="text-lg">تسجيل الدخول</h2>
                <span className="text-xs text-gray-500"
                >قم بتسجيل الدخول لمتابعة التسوق</span
                >
            </div>

            <SignInForm />

        </div>
    )
}

