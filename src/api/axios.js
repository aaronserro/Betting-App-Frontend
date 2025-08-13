import axios from 'axios'

const api = axios.create({
 //baseURL: 'http://localhost:8080',
 baseURL:'https://app-backend-c0t6.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api