import axios from 'axios'

const http = axios.create({
  timeout: 5000,
  baseURL: process.env.VUE_APP_BASE_API || '/web/api',
})

export default http
