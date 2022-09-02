import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddFitController } from '../factories/controllers/add-controller-factory'
import { makeOnApprovalController } from '../factories/controllers/on-approval-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeAddFitController()))
  router.get('/on-approval/:id', adaptRoute(makeOnApprovalController()))
}
