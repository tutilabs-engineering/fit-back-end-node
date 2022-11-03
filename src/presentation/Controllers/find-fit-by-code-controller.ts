import { FindSpecificFitByCode } from '../../domain/useCase/ViewSpecificByCode/view-specific-by-code'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class FindFitByCodeController implements Controller {
  constructor(private readonly find: FindSpecificFitByCode) {}
  async handle(
    request: findFitByCodeController.Request
  ): Promise<HttpResponse> {
    try {
      const fit = await this.find.execute(request.query)
      return ok(fit)
    } catch (error) {
      console.log(error)

      return serverError(error)
    }
  }
}

export namespace findFitByCodeController {
  export type Request = { query: FindSpecificFitByCode.Query }
}
