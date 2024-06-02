
"use client"
import { signInValidationSchema } from '@/constants/validationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Link from 'next/link'
import { toast } from 'sonner'
import HTTPService from '@/services/api'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/userContext'

const SignInForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<yup.InferType<typeof signInValidationSchema>>({
        resolver: yupResolver(signInValidationSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: yup.InferType<typeof signInValidationSchema>) => {
        setLoading(true)
        try {
            const data = await HTTPService.getInstance().login(values);
            // console.log(data)
            // This can be stored after encrypting the token
            document.cookie = `accessToken=${data.token};path=/`

            toast.success("Login Success")
            router.push('/')
        } catch (error) {
            console.log(error)

            toast.error("Something went wrong!")
        }
        // console.log(values);
        setLoading(false)
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full">

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
                    دخول
                </SubmitButton>
                <Link
                    href="/register"
                    className="w-fit text-primary underline p-2 text-md rounded-md hover:bg-opacity-25"
                >
                    إنشاء حساب جديد
                </Link>
            </div>
        </form>
    )
}

export default SignInForm