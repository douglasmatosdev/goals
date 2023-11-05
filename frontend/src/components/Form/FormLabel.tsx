import React from 'react'

export const FormLabel = (props: React.LabelHTMLAttributes<HTMLLabelElement>): JSX.Element => {
    const { children } = props

    return <label {...props}>{children}</label>
}
