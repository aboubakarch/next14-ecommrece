import SignUpForm from '@/components/SignUpForm'
import React from 'react'

export default function Register() {
    return (
        <div className='w-full h-full'>

            <div
                className="flex flex-col text-center items-center justify-center mb-6"
            >
                <h2 className="text-lg">إنشاء حساب</h2>
                <span className="text-xs text-gray-500"
                >قم بإنشاء حساب جديد لمتابعة التسوق</span
                >
            </div>
            <SignUpForm />

        </div>
    )
}

