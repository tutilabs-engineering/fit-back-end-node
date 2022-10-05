import { FitModel } from '../../models/fit'

export interface UpdateFit {
  execute: (fit: UpdateFit.Params) => Promise<UpdateFit.Result>
}

export namespace UpdateFit {
  export type Params = {
    body: Omit<FitModel, 'id'>
    params: Pick<FitModel, 'id'>
    files: any
    account: any
  }
  export type Result = Promise<void>
}
