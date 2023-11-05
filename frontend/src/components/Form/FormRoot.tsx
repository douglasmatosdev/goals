import React from 'react'

export const FormRoot = (props: React.FormHTMLAttributes<HTMLFormElement>): JSX.Element => {
    const { children } = props

    return <form {...props}>{children}</form>
}
