import * as cors from 'cors'
import { NextFunction, Request, Response } from 'express'
export const corsConfig = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: process.env.API_URL,
    preflightContinue: false,
  }
  res.set(options)
  next()
}
