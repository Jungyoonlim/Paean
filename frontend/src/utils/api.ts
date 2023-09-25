import axios, { AxiosInstance } from 'axios'

const baseURL = ''

const http: AxiosInstance = axios.create({
    baseURL,
})

http.defaults.headers.post['Content-Type'] = 'application/json'

export default http