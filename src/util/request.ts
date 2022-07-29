import axios from "axios"
const request = axios.create({
    // 以/api为开头，需要手动加api
    baseURL:'/api/ug/api/wuhan/app/data',
    timeout:3000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(new Error(error))
})

export default request