import service from "./axios"

export const getRandomActivity = () => {
    return service.get('/user')
}