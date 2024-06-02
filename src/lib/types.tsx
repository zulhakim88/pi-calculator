export interface ChildrenElement {
    children: JSX.Element | JSX.Element[]
}

export interface UserAttribute {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    confirmPassword?: string
}