import { ListFitByCode } from '../../../../domain/useCase/ListFitByCode/list-fit-by-code'

export interface ListFitByCodeRepository {
  listFitByCode: (
    fit: ListFitByCodeRepository.Query
  ) => Promise<ListFitByCodeRepository.Result>
}

export namespace ListFitByCodeRepository {
  export type Query = ListFitByCode.Query
  export type Result = ListFitByCode.Result
}
