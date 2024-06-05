import service from "./axios"

export const getLatestPi = () => {
    return service.get('/v1/pi')
}

export const getLatestPiWithPrecission = (digit: number) => {
    return service.get(`/v1/pi/${digit}`)
}

export const upgradeUser = () => {
    return service.get(`/v1/user/upgrade`)
}

export const setUserAsFreeUser = () => {
    return service.get(`/v1/user/default-claims`)
}