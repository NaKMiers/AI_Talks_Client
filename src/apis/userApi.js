import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER })
console.log(process.env.REACT_APP_SERVER)

API.interceptors.request.use(req => {
   const user = localStorage.getItem('user')
   if (user) req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
   return req
})

const userApi = {
   login: data => API.post('/auth/login', data),
   changeTheme: (id, theme) => API.patch(`/users/${id}/change-theme`, { theme }),
   changeAvatar: (id, data) => API.patch(`/users/${id}/change-avatar`, data),
}

export default userApi
