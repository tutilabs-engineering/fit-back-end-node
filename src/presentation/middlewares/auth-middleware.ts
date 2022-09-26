import { LoadAccountByToken } from '../../domain/useCase/Auth/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { HttpResponse } from '../models/http'
import { Middleware } from '../models/middleware'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle(request: AuthMiddlewares.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role
        )
        if (account) {
          if (this.role) {
            if (this.role === 'admin') {
              if (
                account.nivel_de_acesso.descricao === 'eng_admin' ||
                account.nivel_de_acesso.descricao === 'qualidade_admin' ||
                account.nivel_de_acesso.descricao === 'producao_admin' ||
                account.nivel_de_acesso.descricao === 'sesmt_admin'
              ) {
                return ok({ account })
              }
            }
            if (this.role === 'eng_analista') {
              if (account.nivel_de_acesso.descricao === 'eng_analista') {
                return ok({ account })
              }
            }
          }
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddlewares {
  export type Request = {
    accessToken?: string
  }
}
