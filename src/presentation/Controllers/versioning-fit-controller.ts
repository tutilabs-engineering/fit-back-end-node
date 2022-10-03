import { VersioningFIt } from '../../domain/useCase/Versioning/versioning-fit'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'
import { Validation } from '../models/validation'

export class VersioningFitController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly versioning: VersioningFIt
  ) {}

  async handle(fit: VersioningController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(fit)
      if (error) {
        return badRequest(error)
      }
      await this.versioning.execute(fit)
      return ok({ message: 'Fit versioned successfully' })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
export namespace VersioningController {
  export type Request = VersioningFIt.Params
}
