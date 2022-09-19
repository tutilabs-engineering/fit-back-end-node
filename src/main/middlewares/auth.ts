// import { unauthorized } from '../../presentation/helpers/http-helper'
// import { httpUserSystem } from '../../utils/api/user-system-api'
// import * as express from 'express'
import { adaptMiddleware } from '../adpters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
// export const MakeVerifyLoggerMiddleware = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const isValidToken = req.headers.authorization
//   if (!isValidToken) {
//     return unauthorized()
//   }
//   const [, token] = isValidToken.split(' ')

//   try {
//     const response = await httpUserSystem.post(
//       '/session/verify',
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     req.body.user = {
//       ...response.data.user,
//       token,
//     }
//     next()
//   } catch (error) {
//     unauthorized()
//   }
// }

// export const verifyAdminEng = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { user } = req.body

//   if (user.nivel_de_acesso.descricao === 'eng_admin') {
//     next()
//   } else {
//     unauthorized()
//   }
// }
// export const verifyEng = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { user } = req.body

//   if (
//     user.nivel_de_acesso.descricao === 'eng_admin' ||
//     user.nivel_de_acesso.descricao === 'eng_analista' ||
//     user.nivel_de_acesso.descricao === 'eng'
//   ) {
//     next()
//   } else {
//     unauthorized()
//   }
// }
