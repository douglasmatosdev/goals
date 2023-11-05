import { ModalRegister } from '@/components/ModalRegister/ModalRegister'
import Head from 'next/head'

export default function Login(): JSX.Element {
    return (
        <>
            <Head>
                <title>Goals - Register</title>
            </Head>
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#222]">
                <ModalRegister />
            </div>
        </>
    )
}
