import { FindSpecificFitByCode } from '../../../../domain/useCase/ViewSpecificByCode/view-specific-by-code'

export interface FindFitByCodeRepository {
  findFitByCode: (
    fit: FindFitByCodeRepository.Query
  ) => Promise<FindFitByCodeRepository.Result>
}

export namespace FindFitByCodeRepository {
  export type Query = FindSpecificFitByCode.Query
  export type Result = FindSpecificFitByCode.Result
}
