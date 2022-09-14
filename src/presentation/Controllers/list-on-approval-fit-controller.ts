import { ListOnApproval } from '../../domain/useCase/ListOnApproval/list-on-approval'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class ListOnApprovalController implements Controller {
  constructor(private readonly execute: ListOnApproval) {}
  async handle(
    request: ListOnApprovalControler.Request
  ): Promise<HttpResponse> {
    try {
      const fit = await this.execute.execute(request)
      return ok(fit)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace ListOnApprovalControler {
  export type Request = ListOnApproval.Params
}
