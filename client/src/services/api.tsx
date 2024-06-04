import service from "./axios"

export const getLatestPi = () => {
    return service.get('/v1/pi')
}