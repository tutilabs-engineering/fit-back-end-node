import { ListFitByCode } from '../../domain/useCase/ListFitByCode/list-fit-by-code'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class ListFitByCodeController implements Controller {
  constructor(private readonly find: ListFitByCode) {}
  async handle(request: listFitCodeController.Request): Promise<HttpResponse> {
    try {
      const fit = await this.find.execute(request.query)
      return ok(fit)
    } catch (error) {
      console.log(error)

      return serverError(error)
    }
  }
}

export namespace listFitCodeController {
  export type Request = { query: ListFitByCode.Query }
}
