import { Router } from 'express'
import multer from 'multer'
import { uploadFile } from '../middlewares/multer-file-config'
import * as controller from '../factories/controllers'
import { adminAuth, adminAuthEngAnalist } from '../middlewares/auth-admin'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCancellationFitController } from '../factories/controllers/cancellation-fit-factory'
import { makeUpdateFitController } from '../factories/controllers/update-controller-factory'
export default (router: Router): void => {
  router.post(
    '/signup',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(controller.makeAddFitController())
  )
  router.put(
    '/update/:id',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(controller.makeUpdateFitController())
  )
  router.put(
    '/update/:id',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeUpdateFitController())
  )
  router.put(
    '/homologation/:id',
    adminAuth,
    adaptRoute(controller.makeHomologationFitController())
  )
  router.get(
    '/view-specific/:id',
    adaptRoute(controller.makeFindByFitController())
  )
  router.get(
    '/view-specific/',
    adaptRoute(controller.makeFindFitByCodeController())
  )
  router.get(
    '/list-on-approval',
    adaptRoute(controller.makeListOnApprovalController())
  )
  router.get(
    '/list-homologated',
    adaptRoute(controller.makeListHomologatedController())
  )
  router.post(
    '/versioning',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(controller.makeVersioningController())
  )
  router.put(
    '/cancel/:id',
    adminAuth,
    adaptRoute(makeCancellationFitController())
  )
}
