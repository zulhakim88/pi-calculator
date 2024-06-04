import service from "./axios"

export const getLatestPi = () => {
    return service.get('/v1/pi')
}

export const getLatestPiWithPrecission = (digit: number) => {
    return service.get(`/v1/pi/${digit}`)
}