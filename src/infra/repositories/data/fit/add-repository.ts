import { AddFit } from '../../../../domain/useCase/Add/add-fit'

export interface AddFitRepository {
  add: (fit: AddFitRepository.Params) => Promise<AddFitRepository.Result>
}

export namespace AddFitRepository {
  export type Params = AddFit.Params
  export type Result = AddFit.Result
}
