import { CircumferenceDataType, PiDataType, UserPaidStatusType } from "../types"
import service from "../configs/axios"

export const getLatestPi = () => {
	return service.get<PiDataType>("/v1/pi")
}

export const getLatestPiWithPrecission = (digit: number) => {
	return service.get<PiDataType>(`/v1/pi/${digit}`)
}

export const getCircumference = (radius: number) => {
	return service.get<CircumferenceDataType>(`/v1/circumference/${radius}`)
}

export const upgradeUser = () => {
	return service.get<UserPaidStatusType>(`/v1/user/upgrade`)
}

export const downgradeUser = () => {
	return service.get<UserPaidStatusType>(`/v1/user/downgrade`)
}
