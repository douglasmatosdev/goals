import { LOCAL_STORAGE } from '@/utils/constants'

const accountNonExpired = true
const accountNonLocked = true
const credentialsNonExpired = true
const enabled = true
const permissions = [
    {
        id: 1,
        description: ''
    },
    {
        id: 2,
        description: ''
    },
    {
        id: 3,
        description: ''
    }
]

export type ResponseLogin = {
    username: string
    authenticated: boolean
    created: string
    expiration: string
    accessToken: string
    refreshToken: string
}

export type Role = string
export type Roles = Array<Role>
export type Permission = {
    id: number
    description: string
    authority: string
}
export type Authoritie = {
    id: number
    description: string
    authority: string
}
export type Permissions = Array<Permission>
export type Authorities = Array<Authoritie>
export type ResponseRegister = {
    id: number
    username: string
    fullName: string
    password: string
    accountNonExpired: boolean
    accountNonLocked: boolean
    credentialsNonExpired: boolean
    enabled: boolean
    permissions: Permissions
    roles: Roles
    authorities: Authorities
}

export const RoutesApp = {
    unauthenticated: '/unauthenticated',
    dashboard: '/dashboard',
    login: '/login',
    register: '/register'
}

const urls = {
    base: process.env.SERVER_URL,
    login: '/auth/signin',
    register: '/auth/register',
    delete: '/auth/delete'
}

export const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export const getAuthToken = (): string => {
    return window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN) || ''
}

export const setAuthToken = (accessToken: string): void => {
    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken)
}

export const deleteAuthToken = (): void => {
    window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)
}

export const login = (username: string, password: string): Promise<ResponseLogin> =>
    fetch(`${urls.base}${urls.login}`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())

export const register = (fullName: string, username: string, password: string): Promise<ResponseRegister> =>
    fetch(`${urls.base}${urls.register}`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            fullName,
            username,
            password,
            accountNonExpired,
            accountNonLocked,
            credentialsNonExpired,
            enabled,
            permissions
        })
    }).then(response => response.json())

export const remove = (fullName: string, username: string, password: string): Promise<Response> =>
    fetch(`${urls.base}${urls.delete}`, {
        method: 'DELETE',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            fullName,
            username,
            password,
            accountNonExpired,
            accountNonLocked,
            credentialsNonExpired,
            enabled,
            permissions
        })
    }).then(response => response.json())
