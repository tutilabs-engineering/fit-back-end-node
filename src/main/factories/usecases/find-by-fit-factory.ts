import { FindSpecificFit } from '../../../domain/useCase/ViewSpecific/view-specific'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DdFindByFit } from '../../../infra/implements/usecase/db-find-by-fit'

export const makeDbFindByFit = (): FindSpecificFit => {
  const findByFItRepository = new FitMysqlRepository()
  return new DdFindByFit(findByFItRepository)
}
