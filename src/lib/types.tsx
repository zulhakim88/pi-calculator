export interface User {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    password2?: string,
    accessToken?: string
}

export interface ChildrenElement {
    children: JSX.Element | JSX.Element[]
}

export interface FormAttribute {
    email: string,
    password: string,
    confirmPassword?: string
}