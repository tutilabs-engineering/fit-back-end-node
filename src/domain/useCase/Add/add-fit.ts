import { FitModel } from '../models/fit'

export interface AddFit {
  execute: (fit: AddFit.Params) => Promise<AddFit.Result>
}

export namespace AddFit {
  export type Params = {
    body: Omit<FitModel, 'id'>
    files: any
    account: any
  }
  export type Result = Promise<void>
}
