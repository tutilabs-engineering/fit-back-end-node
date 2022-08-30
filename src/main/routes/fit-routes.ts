import { Router } from 'express'
import { adaptRoute } from '../adpters/express-route-adapter'
import { makeAddFitController } from '../factories/controllers/add-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeAddFitController()))
}
