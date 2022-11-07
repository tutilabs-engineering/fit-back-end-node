import { FitModel } from '../../models/fit'

export interface ListFitByCode {
  execute: (fit: ListFitByCode.Query) => Promise<ListFitByCode.Result>
}

export namespace ListFitByCode {
  export type Query = Pick<FitModel, 'product_code' | 'code_mold'>
  export type Result = FitModel[]
}
