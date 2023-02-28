import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER })

API.interceptors.request.use(req => {
   const user = localStorage.getItem('user')
   if (user) req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
   return req
})

const imageApi = {
   generateImage: (prompt, amount, size, id = 0) => API.post(`/images/${id}`, { prompt, amount, size }),
}

export default imageApi
