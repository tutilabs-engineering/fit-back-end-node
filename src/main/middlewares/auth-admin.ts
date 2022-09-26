import { adaptMiddleware } from '../adpters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
export const adminAuthEngAnalist = adaptMiddleware(
  makeAuthMiddleware('eng_analista')
)
