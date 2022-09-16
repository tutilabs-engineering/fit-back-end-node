import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeListHomologatedController } from '../factories/controllers/list-homologated-factory'

export default (router: Router): void => {
  router.get('/list-homologated', adaptRoute(makeListHomologatedController()))
}
