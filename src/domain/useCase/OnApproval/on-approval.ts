import { FitModel } from '../models/fit'

export interface OnApproval {
  execute: (fit: OnApproval.Params) => Promise<OnApproval.Result>
}

export namespace OnApproval {
  export type Params = Pick<FitModel, 'id'>
  export type Result = FitModel
}
