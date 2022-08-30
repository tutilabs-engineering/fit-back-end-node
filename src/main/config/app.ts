import 'dotenv/config'
import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
export const setupApp = async (): Promise<Express> => {
  const app = express()
  // setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
