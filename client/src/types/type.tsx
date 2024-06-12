export type ChildrenElementType = {
	children: JSX.Element | JSX.Element[]
}

export type RegisterUserAttributeType = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
}

export type LoginUserAttributeType = {
	email: string
	password: string
}

export type PiDataType = {
	length: number
	pi: string
}

export type CircumferenceDataType = {
	circumference: string
	piLength: number
}

export type UserPaidStatusType = {
	isPaidUser: boolean
}
