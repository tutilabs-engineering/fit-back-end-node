import { json, urlencoded } from 'express'

export const bodyParser = json()
export const urlenCoded = urlencoded({ extended: true })
