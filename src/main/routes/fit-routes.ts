import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddFitController } from '../factories/controllers/add-controller-factory'
import { makeViewOnApprovalController } from '../factories/controllers/view-on-approval-factory'
import { makeListOnApprovalController } from '../factories/controllers/list-on-approval-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeAddFitController()))
  router.get(
    '/view-on-approval/:id',
    adaptRoute(makeViewOnApprovalController())
  )
  router.get('/list-on-approval', adaptRoute(makeListOnApprovalController()))
}
