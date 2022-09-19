import { Router } from 'express'
import { adaptRoute } from '../adpters/express-route-adapter'
import { makeAddFitController } from '../factories/controllers/add-controller-factory'
import multer from 'multer'
import { uploadFile } from '../middlewares/multer-file-config'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post(
    '/signup',
    auth,
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeAddFitController())
  )
}
