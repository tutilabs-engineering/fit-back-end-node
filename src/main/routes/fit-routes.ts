import { Router } from 'express'
import { adaptRoute } from '../adpters/express-route-adapter'
import { makeAddFitController } from '../factories/controllers/add-controller-factory'
import { makeUpdateFitController } from '../factories/controllers/update-controller-factory'
import multer from 'multer'
import { uploadFile } from '../middlewares/multer-file-config'

export default (router: Router): void => {
  router.post(
    '/signup',
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeAddFitController())
  )
  router.post(
    '/review/:id',
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeUpdateFitController())
  )
}
