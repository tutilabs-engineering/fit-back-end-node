import { ListHomologated } from '../../domain/useCase/Homologated/list-homologated'
import { ok, serverError } from '../helpers/http-helper'
import { Controller } from '../models/controller'
import { HttpResponse } from '../models/http'

export class ListHomologatedController implements Controller {
  constructor(private readonly execute: ListHomologated) {}
  async handle(): Promise<HttpResponse> {
    try {
      const fit = await this.execute.execute()
      return ok(fit)
    } catch (error) {
      return serverError(error)
    }
  }
}
export namespace ListHomologatedControler {
  export type Request = ListHomologated.Params
}
