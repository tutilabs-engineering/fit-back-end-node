import { FitModel } from '../models/fit'

export interface AddFit {
  execute: (fit: AddFit.Params) => Promise<AddFit.Result>
}

export namespace AddFit {
  export type Params = Omit<FitModel, 'id'>
  export type Result = FitModel
}
