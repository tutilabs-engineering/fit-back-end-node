import { UpdateFit } from '../../domain/useCase/Update/update-fit'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'
import { Validation } from '../models/validation'

export class UpdateFitControler implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly update: UpdateFit
  ) {}

  async handle(
    request: UpdateFitControllerType.Request
  ): Promise<HttpResponse> {
    try {
      const error = this.validate.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.update.execute(request)
      return ok({ msg: 'Created successfully' })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
export namespace UpdateFitControllerType {
  export type Request = UpdateFit.Params
}
