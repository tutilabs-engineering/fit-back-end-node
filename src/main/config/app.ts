import 'dotenv/config'
import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from '../config/swagger'
import setupUploadsFiles from '../config/uploadsFiles'
import path from 'path'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupUploadsFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)

  app.use("/uploads", express.static(path.join(__dirname, '..', '..', '..','uploads', 'pdf-files'),{setHeaders: (res)=>{res.setHeader('Content-Type', 'application/pdf')}}))

  setupRoutes(app)
  return app
}
