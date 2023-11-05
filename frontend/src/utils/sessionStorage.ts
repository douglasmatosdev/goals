export const getSessionStorageItem = (key: string): string => {
    return window.sessionStorage.getItem(key) || ''
}

/**
 *
 * @param key
 * @param value "error:some message"
 */
export const setSessionStorageItem = (key: string, value: string): void => {
    window.sessionStorage.setItem(key, value)
}

export const deleteSessionStorageItem = (key: string): void => {
    window.sessionStorage.removeItem(key)
}
