import { ListFitByCode } from '../../../domain/useCase/ListFitByCode/list-fit-by-code'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DdListFitByCode } from '../../../infra/implements/usecase/db-list-fit-by-code'

export const makeDbListFitByCode = (): ListFitByCode => {
  const listFitByCodeRepository = new FitMysqlRepository()
  return new DdListFitByCode(listFitByCodeRepository)
}
