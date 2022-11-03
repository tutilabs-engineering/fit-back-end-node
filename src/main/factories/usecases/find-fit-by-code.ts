import { FindSpecificFitByCode } from '../../../domain/useCase/ViewSpecificByCode/view-specific-by-code'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DdFindFitByCode } from '../../../infra/implements/usecase/db-find-fit-by-code'

export const makeDbFindFitByCode = (): FindSpecificFitByCode => {
  const findFitByCodeRepository = new FitMysqlRepository()
  return new DdFindFitByCode(findFitByCodeRepository)
}
