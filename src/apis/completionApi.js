import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER })

API.interceptors.request.use(req => {
   const user = localStorage.getItem('user')
   if (user) req.headers.Authorization = `Bearer ${JSON.parse(user).token}`
   return req
})

const completionApi = {
   createCompletion: data => API.post('/completions', data),

   getPrompts: id => API.get(`/completions/${id}`),
   createFullCompletion: (id, data) => API.post(`/completions/${id}`, data),
   createPrompt: (id, prompt) => API.post(`/completions/${id}/prompt`, { prompt }),
}

export default completionApi
