import axios, { Axios } from 'axios'

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
})
