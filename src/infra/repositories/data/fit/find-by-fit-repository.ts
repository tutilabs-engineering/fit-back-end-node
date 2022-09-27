import { FindSpecificFit } from '../../../../domain/useCase/ViewSpecific/view-specific'

export interface FindByFitRepository {
  findByFit: (
    fit: FindByFitRepository.Params
  ) => Promise<FindByFitRepository.Result>
}

export namespace FindByFitRepository {
  export type Params = FindSpecificFit.Params
  export type Result = FindSpecificFit.Result
}
