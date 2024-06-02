export interface ChildrenElement {
    children: JSX.Element | JSX.Element[]
}

export interface UserAttribute {
    email: string,
    password: string,
    confirmPassword?: string
}