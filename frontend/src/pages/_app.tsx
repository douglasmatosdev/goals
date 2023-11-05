// These styles apply to every route in the application
import '@/app/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Component {...pageProps} />
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
