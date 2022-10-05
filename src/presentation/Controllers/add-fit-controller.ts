import { AddFit } from '../../domain/useCase/Add/add-fit'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'
import { Validation } from '../models/validation'

export class AddFitControler implements Controller {
  constructor(
    private readonly validate: Validation,
    private readonly add: AddFit
  ) {}

  async handle(request: AddFitControllerType.Request): Promise<HttpResponse> {
    try {
      const error = await this.validate.validate(request)
      if (error) {
        console.error(error)
        return badRequest(error)
      }
      await this.add.execute(request)
      return ok({ message: 'Created successfully' })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
export namespace AddFitControllerType {
  export type Request = AddFit.Params
}
