import axios from 'axios'
export const httpUserSystem = axios.create({
  baseURL: 'http://185.209.179.253:7900',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
