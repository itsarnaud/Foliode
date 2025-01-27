export interface User {
    lastname: string
    firstname: string
    username: string
    email: string
    roles: string[]
    avatar_url: string | null
    github_login: string | null
    dribbble_login: string | null
    exp: number
    iat: number
}
