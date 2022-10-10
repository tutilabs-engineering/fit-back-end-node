import { Router } from 'express'
import multer from 'multer'
import { uploadFile } from '../middlewares/multer-file-config'
import {
  makeHomologationFitController,
  makeAddFitController,
  makeUpdateFitController,
  makeFindByFitController,
  makeFindFitByCodeController,
  makeListHomologatedController,
  makeListOnApprovalController,
  makeVersioningController,
} from '../factories/controllers'
import { adminAuth, adminAuthEngAnalist } from '../middlewares/auth-admin'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCancellationFitController } from '../factories/controllers/cancellation-fit-factory'
export default (router: Router): void => {
  router.post(
    '/signup',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeAddFitController())
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
    adaptRoute(makeHomologationFitController())
  )
  router.get('/view-specific/:id', adaptRoute(makeFindByFitController()))
  router.get('/view-specific/', adaptRoute(makeFindFitByCodeController()))
  router.get('/list-on-approval', adaptRoute(makeListOnApprovalController()))
  router.get('/list-homologated', adaptRoute(makeListHomologatedController()))
  router.post(
    '/versioning',
    adminAuthEngAnalist,
    multer(uploadFile.getConfig).any(),
    adaptRoute(makeVersioningController())
  )
  router.put(
    '/cancel/:id',
    adminAuth,
    adaptRoute(makeCancellationFitController())
  )
}
