import { FindSpecificFit } from '../../domain/useCase/ViewSpecific/view-specific'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class FindByFitController implements Controller {
  constructor(private readonly find: FindSpecificFit) {}
  async handle(request: findByFitController.Request): Promise<HttpResponse> {
    try {
      const fit = await this.find.execute(request.params)
      return ok(fit)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace findByFitController {
  export type Request = { params: FindSpecificFit.Params }
}
