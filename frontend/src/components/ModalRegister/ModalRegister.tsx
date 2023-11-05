import { Form } from '../Form'
import React from 'react'
import { toast } from 'react-toastify'
import { RoutesApp, register } from '@/app/api'
import { checkEmptyFields } from '@/utils/checkEmptyFields'
import { useRouter } from 'next/navigation'
import { setSessionStorageItem } from '@/utils/sessionStorage'
import { SESSION_STORAGE } from '@/utils/constants'

interface ModalRegisterProps {
    handleCancel?: () => void
}

const emptyInitialState = {
    fullname: false,
    username: false,
    password: false
}

export const ModalRegister = (props: ModalRegisterProps): JSX.Element => {
    const { handleCancel } = props
    const [fullname, setFullname] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [empty, setEmpty] = React.useState<typeof emptyInitialState>(emptyInitialState)

    const router = useRouter()

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        fullname: string,
        username: string,
        password: string
    ): Promise<void> => {
        e.preventDefault()

        if (!fullname || !username || !password) {
            toast.warn('All fields must be filled')

            checkEmptyFields({ fullname, username, password }, setEmpty)

            return
        }

        await register(fullname, username, password)
            .then(response => {
                if (!response?.id) {
                    toast.error('An error occurred when trying to register the user')

                    return
                }

                toast.success('user successfully registered ')

                router.push(RoutesApp.login)
            })
            .catch((err: Error) => {
                setSessionStorageItem(SESSION_STORAGE.TOAST, `error:${err.message}`)
                router.push('/')
            })
    }

    const handleInputFullName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFullname(e.target.value)
    }

    const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value)
    }

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    return (
        <div className="min-w-[450px] w-max min-h-[150px] h-auto rounded-sm bg-white flex flex-col justify-center items-center p-8">
            <h1 className="text-[#bebebe] text-7xl mb-8 text-shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">Goals</h1>
            <Form.Root className="w-full flex flex-col" onSubmit={e => handleSubmit(e, fullname, username, password)}>
                <Form.Label htmlFor="fullname" className="flex flex-col justify-center items-start pb-8">
                    <span>Full name</span>
                    <Form.Input
                        onMouseDown={() => setEmpty(emptyInitialState)}
                        className={`h-[48px] ${empty.fullname && 'alert-empty'}`}
                        name="fullname"
                        type="fullname"
                        placeholder="Type your full name"
                        onChange={handleInputFullName}
                    />
                </Form.Label>
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

                <Form.Label htmlFor="login" className="flex flex-col justify-center items-start pb-8">
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
