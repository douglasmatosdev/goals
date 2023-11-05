'use client'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { useRouter } from 'next/navigation'
import { RoutesApp } from './api'
import { Form } from '@/components/Form'
import { ToastContainer } from 'react-toastify'
import { useToastSessionStorage } from '@/hooks/useToastSessionStorage'

export default function Home(): JSX.Element {
    const router = useRouter()

    useToastSessionStorage()

    const handleClickLogin = (): void => {
        router.push(RoutesApp.login)
    }

    const handleClickRegister = (): void => {
        router.push(RoutesApp.register)
    }

    return (
        <>
            <main className="flex flex-col items-center p-24 min-h-screen bg-[#222]">
                <h1 className="text-[#bebebe] text-7xl mb-8">Goals</h1>
                <div className="flex justify-between items-center min-w-[300px] w-max p-8 rounded-md bg-[#999]">
                    <Form.Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleClickLogin}>
                        Login
                    </Form.Button>
                    <Form.Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleClickRegister}>
                        Register
                    </Form.Button>
                </div>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
            />
        </>
    )
}
