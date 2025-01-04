export interface User {
    name: string
    firstname: string
    email: string
    roles: string[]
    avatar_url: string | null
    github_login: string | null
    dribbble_login: string | null
    exp: number
    iat: number
}
