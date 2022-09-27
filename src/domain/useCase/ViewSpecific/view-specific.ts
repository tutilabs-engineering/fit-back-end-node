import { FitModel } from '../../models/fit'

export interface FindSpecificFit {
  execute: (fit: FindSpecificFit.Params) => Promise<FindSpecificFit.Result>
}

export namespace FindSpecificFit {
  export type Params = Pick<FitModel, 'id'>
  export type Result = FitModel
}
