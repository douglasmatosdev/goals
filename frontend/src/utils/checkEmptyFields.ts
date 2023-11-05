export const checkEmptyFields = <T extends Record<string, string>, K extends Record<string, boolean>>(
    fields: T,
    setEmpty: React.Dispatch<React.SetStateAction<K>>
): void => {
    const checkedFields = Object.entries(fields).reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key]: !value
        }
    }, {} as K)

    setEmpty(checkedFields)
}
