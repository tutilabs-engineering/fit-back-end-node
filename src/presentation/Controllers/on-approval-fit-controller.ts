import { OnApproval } from '../../domain/useCase/OnApproval/on-approval'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class OnApprovalController implements Controller {
  constructor(private readonly execute: OnApproval) {}
  async handle(request: OnApprovalControler.Request): Promise<HttpResponse> {
    try {
      const fit = await this.execute.execute(request)
      console.log(fit)
      return ok(fit)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace OnApprovalControler {
  export type Request = OnApproval.Params
}
