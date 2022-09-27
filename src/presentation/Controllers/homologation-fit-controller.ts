import { HomologationFit } from '../../domain/useCase/Homologation/homologation-fit'
import { PrismaHelper } from '../../infra/data-mysql/prisma-helper'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'
import { Validation } from '../models/validation'

export class HomologationFitController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly homolagtion: HomologationFit
  ) {}

  async handle(request: HomologationFit.Params): Promise<HttpResponse> {
    try {
      const findHomologationJSON =
        await PrismaHelper.prisma.homologation.findFirst({
          select: {
            user_homologation: true,
          },
          where: { id: Number(request.params.id) },
        })

      if (!findHomologationJSON.user_homologation) {
        const findHomologation: any = []
        findHomologation.push({
          id: request.account.id,
          name: request.account.nome_completo,
          email: request.account.email,
          registration: request.account.matricula,
          role: request.account.nivel_de_acesso.descricao,
        })
        request.body = { findHomologation, status: 1 }
        await this.homolagtion.execute(request)
        return ok({ message: 'Approval carried out successfully' })
      }
      const findHomologation = JSON.parse(
        findHomologationJSON.user_homologation.toLocaleString()
      )
      const find = findHomologation.some(
        (values: any) =>
          values.role === request.account.nivel_de_acesso.descricao
      )
      if (find) {
        return badRequest(new MissingParamError('fnvkdfjvnj'))
      }

      findHomologation.push({
        id: request.account.id,
        name: request.account.nome_completo,
        email: request.account.email,
        registration: request.account.matricula,
        role: request.account.nivel_de_acesso.descricao,
      })
      if (findHomologation.length === 4) {
        request.body = { findHomologation, status: 3 }
        await this.homolagtion.execute(request)
        return ok({ message: 'Approval carried out successfully' })
      }
      request.body = { findHomologation, status: 1 }
      await this.homolagtion.execute(request)
      return ok({ message: 'Approval carried out successfully' })
    } catch (error) {
      return serverError(error)
    }
  }
}
