import React from 'react'
import { twMerge } from 'tailwind-merge'

export const FormButton = (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }
): JSX.Element => {
    const { children, className = '' } = props

    const classes = twMerge(
        `border-none rounded-md py-4 px-6 cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white text-black transition ease-in-out duration-300 ${className}`
    )

    return (
        <button {...props} className={classes}>
            {children}
        </button>
    )
}
