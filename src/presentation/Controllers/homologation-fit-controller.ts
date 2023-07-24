import { FitMysqlRepository } from './../../infra/data-mysql/fit-mysql-repository'
import { HomologationFit } from '../../domain/useCase/Homologation/homologation-fit'
import { PrismaHelper } from '../../infra/data-mysql/prisma-helper'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'
import { Validation } from '../models/validation'
// import { MountPDF } from '../../utils/mountPDF/hbs-pdf'
// import { SendPDFtoFTP } from '../../utils/ftp/ftp'
// import Client from 'ftp'
// import { MountPortableDocumentFormat } from '../../utils/mountPDF/MountPortableDocumentFormat'

export class HomologationFitController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly homolagtion: HomologationFit
  ) {}

  async handle(request: HomologationFit.Params): Promise<HttpResponse> {
    // const mountPDF = new MountPDF()
    const fitMySqlRepository = new FitMysqlRepository()
    // const sendPDFtoFTP = new SendPDFtoFTP()
    // const mountPortableDocumentFormat = new MountPortableDocumentFormat()

    try {
      const fit = await fitMySqlRepository.findByFit(request.params)
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
          comment: request.body.comment,
          status: request.body.status,
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
        comment: request.body.comment,
        status: request.body.status,
      })

      if (findHomologation.length === 4) {
        request.body = { findHomologation, status: 3 }
        await this.homolagtion.execute(request)
        // TODO:  PDF enters here
        // await mountPDF.mountPDFfunction(fit)
        try {
          // const pathFile = await mountPortableDocumentFormat.execute({
          //   Attention_point_control: fit.Attention_point_control,
          //   id: fit.id,
          //   code_mold: fit.code_mold,
          //   mold: fit.mold,
          //   product_code: fit.product_code,
          //   client: fit.client,
          //   product_description: fit.product_description,
          //   date: fit.date,
          //   process: fit.process,
          //   Controller_attention_point: fit.Attention_point_control,
          //   Workstations: fit.Workstation,
          //   Homologation: fit.Homologation,
          // })
          // await sendPDFtoFTP.sendPDFtoFTPfunction(fit.product_code)
        } catch (error) {
          console.log({ error })
        }

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
