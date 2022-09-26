import { FitModel } from '../models/fit'

export interface ListOnApproval {
  execute: () => Promise<ListOnApproval.Result[]>
}

export namespace ListOnApproval {
  export type Params = FitModel
  export type Result = any
}
