import { FitModel } from '../models/fit'

export interface ViewOnApproval {
  execute: (fit: ViewOnApproval.Params) => Promise<ViewOnApproval.Result>
}

export namespace ViewOnApproval {
  export type Params = Pick<FitModel, 'id'>
  export type Result = FitModel
}
