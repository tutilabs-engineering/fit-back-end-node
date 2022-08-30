import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { contentType } from '../middlewares/content-type'
import { corsConfig } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(corsConfig)
  app.use(contentType)
}
