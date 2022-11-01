import axios from 'axios'
export const httpReportSystem = axios.create({
  baseURL: 'http://185.209.179.253:5001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
