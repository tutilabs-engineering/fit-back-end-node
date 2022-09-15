import { Request, Response } from 'express'
import { Controller } from '../../presentation/models/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: req.body,
      params: req.params,
      file: req.file,
      files: req.files,
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
