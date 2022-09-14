import { ViewOnApproval } from '../../domain/useCase/OnApproval/view-on-approval'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class ViewOnApprovalController implements Controller {
  constructor(private readonly execute: ViewOnApproval) {}
  async handle(
    request: ViewOnApprovalControler.Request
  ): Promise<HttpResponse> {
    try {
      const fit = await this.execute.execute(request)
      return ok(fit)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace ViewOnApprovalControler {
  export type Request = ViewOnApproval.Params
}
