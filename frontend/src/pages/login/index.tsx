import { ModalLogin } from '@/components/ModalLogin/ModalLogin'
import Head from 'next/head'

export default function Login(): JSX.Element {
    return (
        <>
            <Head>
                <title>Goals - Login</title>
            </Head>
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#222]">
                <ModalLogin />
            </div>
        </>
    )
}
