import React from 'react'
import { twMerge } from 'tailwind-merge'

export const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement> & { className: string }): JSX.Element => {
    const { className = '' } = props

    const classes = twMerge(`
        w-full border border-gray-500 rounded-sm p-2
        ${className}
    `)

    return <input {...props} className={classes} />
}
