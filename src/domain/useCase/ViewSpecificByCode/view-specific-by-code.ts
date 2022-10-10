import { FitModel } from '../../models/fit'

export interface FindSpecificFitByCode {
  execute: (
    fit: FindSpecificFitByCode.Query
  ) => Promise<FindSpecificFitByCode.Result>
}

export namespace FindSpecificFitByCode {
  export type Query = Pick<FitModel, 'product_code' | 'code_mold'>
  export type Result = FitModel
}
