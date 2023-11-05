import { SESSION_STORAGE } from '@/utils/constants'
import { deleteSessionStorageItem, getSessionStorageItem } from '@/utils/sessionStorage'
import React from 'react'
import { toast } from 'react-toastify'

export const useToastSessionStorage = (): void => {
    React.useEffect(() => {
        const sessionStorageItem = getSessionStorageItem(SESSION_STORAGE.TOAST)

        if (sessionStorageItem) {
            const [type, message] = sessionStorageItem.split(':').map(e => e.trim())

            const fn = toast[type as keyof typeof toast] as typeof toast

            fn(message)

            deleteSessionStorageItem(SESSION_STORAGE.TOAST)
        }
    }, [])
}
