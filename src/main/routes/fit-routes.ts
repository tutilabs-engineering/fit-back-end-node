import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeOnApprovalController } from '../factories/controllers/on-approval-factory'

export default (router: Router): void => {
  router.get('/view-on-approval/:id', adaptRoute(makeOnApprovalController()))
}
