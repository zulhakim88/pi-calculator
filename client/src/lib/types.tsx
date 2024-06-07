export interface ChildrenElement {
    children: JSX.Element | JSX.Element[]
}

export interface RegisterUserAttribute {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string | null
}

export interface LoginUserAttribute {
    email: string,
    password: string
}

export interface PiDataType {
    length: number,
    pi: string
}

export interface CircumferenceDataType {
    circumference: string,
    piLength: number
}

export interface UserPaidStatusType {
    isPaidUser: boolean
}