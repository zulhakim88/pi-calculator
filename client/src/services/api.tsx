import { CircumferenceDataType, PiDataType, UserPaidStatusType } from "../lib/types"
import service from "../configs/axios"

export const getLatestPi = () => {
	return service.get<void, PiDataType>("/v1/pi")
}

export const getLatestPiWithPrecission = (digit: number) => {
	return service.get<void, PiDataType>(`/v1/pi/${digit}`)
}

export const getCircumference = (radius: number) => {
	return service.get<void, CircumferenceDataType>(`/v1/circumference/${radius}`)
}

export const upgradeUser = () => {
	return service.get<void, UserPaidStatusType>(`/v1/user/upgrade`)
}

export const downgradeUser = () => {
	return service.get<void, UserPaidStatusType>(`/v1/user/downgrade`)
}
