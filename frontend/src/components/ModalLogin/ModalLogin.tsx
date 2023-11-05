import { Form } from '../Form'
import React from 'react'
import { ResponseLogin, RoutesApp, login, setAuthToken } from '../../app/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { checkEmptyFields } from '@/utils/checkEmptyFields'
import { SESSION_STORAGE } from '@/utils/constants'
import { setSessionStorageItem } from '@/utils/sessionStorage'

const emptyInitialState = {
    username: false,
    password: false
}

export const ModalLogin = (): JSX.Element => {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [empty, setEmpty] = React.useState<typeof emptyInitialState>(emptyInitialState)

    const router = useRouter()

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        username: string,
        password: string
    ): Promise<void> => {
        e.preventDefault()

        if (!username || !password) {
            toast.warn('All fields must be filled')

            checkEmptyFields({ username, password }, setEmpty)

            return
        }

        await login(username, password)
            .then((e: ResponseLogin) => {
                if (!e?.authenticated) {
                    router.push('/')

                    setSessionStorageItem(SESSION_STORAGE.TOAST, 'warning:Unregistered username or password')

                    return
                }

                setAuthToken(e.accessToken)

                router.push(RoutesApp.dashboard)

                toast.success('Login successful!')

                setEmpty({
                    username: false,
                    password: false
                })
            })
            .catch((err: Error) => {
                setSessionStorageItem(SESSION_STORAGE.TOAST, err.message)
                router.push('/')
            })
    }

    const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value)
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const handleCancel = (): void => {
        router.push('/')
    }

    return (
        <div className="min-w-[450px] w-max min-h-[150px] h-auto rounded-sm bg-white flex flex-col justify-center items-center p-8">
            <h1 className="text-[#bebebe] text-7xl mb-8 text-shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">Goals</h1>
            <Form.Root className="w-full flex flex-col" onSubmit={e => handleSubmit(e, username, password)}>
                <Form.Label htmlFor="login" className="flex flex-col justify-center items-start pb-8">
                    <span>Username</span>
                    <Form.Input
                        onMouseDown={() => setEmpty(emptyInitialState)}
                        className={`h-[48px] ${empty.username && 'alert-empty'}`}
                        name="login"
                        type="login"
                        placeholder="Type your username"
                        onChange={handleInputUsername}
                    />
                </Form.Label>

                <Form.Label htmlFor="password" className="flex flex-col justify-center items-start pb-8">
                    <span>Password</span>
                    <Form.Input
                        onMouseDown={() => setEmpty(emptyInitialState)}
                        className={`h-[48px] ${empty.password && 'alert-empty'}`}
                        name="password"
                        type="password"
                        placeholder="Type your password"
                        onChange={handleInputPassword}
                    />
                </Form.Label>

                <div className="flex justify-between">
                    <Form.Button className="text-white bg-green-500 hover:bg-green-600" type="submit">
                        submit
                    </Form.Button>

                    <Form.Button
                        className="text-white bg-red-500 hover:bg-red-600"
                        type="button"
                        onClick={handleCancel}
                    >
                        cancel
                    </Form.Button>
                </div>
            </Form.Root>
        </div>
    )
}
