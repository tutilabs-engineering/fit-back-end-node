import { Router } from 'express'
import { makeAddFitController } from '../factories/controllers/add-controller-factory'
import multer from 'multer'
import { uploadFile } from '../middlewares/multer-file-config'
import { makeHomologationFitController } from '../factories/controllers/homologation-controller-factory'
import { adminAuth, adminAuthEngAnalist } from '../middlewares/auth-admin'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeListHomologatedController } from '../factories/controllers/list-homologated-factory'
export default (router: Router): void => {
  router.post(
    '/signup',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeAddFitController())
  )
  router.put(
    '/homologation/:id',
    adminAuth,
    adaptRoute(makeHomologationFitController())
  )
  router.get('/view-specific/:id', adaptRoute(makeViewOnApprovalController()))
  router.get('/list-on-approval', adaptRoute(makeListOnApprovalController()))
  router.get('/list-homologated', adaptRoute(makeListHomologatedController()))
}
