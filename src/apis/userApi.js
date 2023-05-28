import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER })

API.interceptors.request.use(req => {
   const user = localStorage.getItem('user')
   if (user) req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
   return req
})

const userApi = {
   getUserData: id => API.get(`/users/${id}`),
   login: data => API.post('/auth/login', data),
   register: data => API.post('/auth/register', data),
   changeAvatar: (id, data) => API.patch(`/users/${id}/change-avatar`, data),

   // change pamameter
   changeParameter: (id, data) => API.patch(`/users/${id}/change-parameter`, { data }),
}

export default userApi
