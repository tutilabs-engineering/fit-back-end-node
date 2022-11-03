import { AddFit } from '../../../../domain/useCase/Add/add-fit'

export interface AddFitRepository {
  add: (fit: AddFit.Params) => Promise<AddFit.Result>
}

export namespace AddFitRepository {
  export type Params = AddFit.Params
  export type Result = AddFit.Result
}
