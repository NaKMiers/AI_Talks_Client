import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER })

API.interceptors.request.use(req => {
   const user = localStorage.getItem('user')
   if (user) req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
   return req
})

const imageApi = {
   generateImage: data => API.post('/images', data),

   getImages: id => API.get(`/images/${id}`),
   generateFullImage: (id, data) => API.post(`/images/${id}`, data),
   createPrompt: (id, prompt) => API.post(`/images/${id}/prompt`, { prompt }),
}

export default imageApi
