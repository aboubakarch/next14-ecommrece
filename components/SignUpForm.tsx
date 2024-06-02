
"use client"
import { signUpValidationSchema } from '@/constants/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Link from 'next/link'
import HTTPService from '@/services/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<yup.InferType<typeof signUpValidationSchema>>({
        resolver: yupResolver(signUpValidationSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        },
    })

    const onSubmit = async (values: yup.InferType<typeof signUpValidationSchema>) => {
        setLoading(true)
        try {
            const data = await HTTPService.getInstance().register(values);

            toast.success("Successfully Registered")
            router.push('/login')

        } catch (error) {
            console.log(error)

            toast.error("Something went wrong!")
        }
        setLoading(false)
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full transition-all ease-in-out duration-300">

            <InputField
                type="text"
                id="firstName"
                autoComplete="on"
                placeholder="الاسم الأول.."
                label="الاسم الأول"
                {...form.register("firstName")}
                error={form.formState.errors?.firstName?.message}

            />
            <InputField
                type="text"
                id="lastName"
                autoComplete="on"
                placeholder="الاسم الأخير.."
                label="الاسم الأخير"
                {...form.register("lastName")}
                error={form.formState.errors?.lastName?.message}
            />
            <InputField
                type="text"
                id="email"
                autoComplete="on"
                placeholder="البريد الإلكتروني.."
                label='البريد الإلكتروني'
                {...form.register("email")}
                error={form.formState.errors?.email?.message}
            />

            <InputField
                type="password"
                autoComplete="on"
                id="password"
                placeholder="كلمة المرور.."
                label='كلمة المرور'
                {...form.register("password")}
                error={form.formState.errors?.password?.message}
            />
            <div className="flex gap-4">
                <SubmitButton disabled={loading} loading={loading}>
                    سجل
                </SubmitButton>
                <Link
                    href="/login"
                    className="w-fit text-primary underline p-2 text-md rounded-md"
                >
                    لديك حساب بالفعل
                </Link>
            </div>
        </form>
    )
}

export default SignUpForm