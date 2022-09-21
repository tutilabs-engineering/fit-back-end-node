import { FitModel } from '../models/fit'

export interface UpdateFit {
  execute: (fit: UpdateFit.Params) => Promise<UpdateFit.Result>
}

export namespace UpdateFit {
  export type Params = {
    body: Omit<FitModel, 'id'>
    files: any
    params: Pick<FitModel, 'id'>
  }
  export type Result = Promise<void>
}
