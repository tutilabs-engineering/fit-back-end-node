import { CancellationFit } from '../../domain/useCase/Cancellation/cancellation-fit'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class CancellationFitController implements Controller {
  constructor(private readonly cancel: CancellationFit) {}
  async handle(
    request: CancellationFitController.Request
  ): Promise<HttpResponse> {
    try {
      const cancelFit = await this.cancel.execute(request.params)
      return ok(cancelFit)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

namespace CancellationFitController {
  export type Request = { params: CancellationFit.Params }
}
