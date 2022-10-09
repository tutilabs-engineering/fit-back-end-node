import 'dotenv/config'
import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
// import setupSwagger from '../config/swagger'
import setupUploadsFiles from '../config/uploadsFiles'
export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupUploadsFiles(app)
  // setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
