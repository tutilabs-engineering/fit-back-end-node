import { AddFit } from '../../domain/useCase/Add/add-fit'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class AddFitControler implements Controller {
  constructor(private readonly add: AddFit) {}
  async handle(request: AddFitController.Request): Promise<HttpResponse> {
    try {
      const fit = await this.add.execute(request)
      return ok(fit)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace AddFitController {
  export type Request = Omit<AddFit.Params, 'id'>
}
