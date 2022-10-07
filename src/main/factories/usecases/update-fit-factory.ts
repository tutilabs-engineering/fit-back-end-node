import { UpdateFit } from '../../../domain/useCase/Update/update-fit'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbUpdateFit } from '../../../infra/implements/usecase/db-update-fit'

export const makeDbUpdateFit = (): UpdateFit => {
  const fitMysqlRepository = new FitMysqlRepository()
  return new DbUpdateFit(fitMysqlRepository)
}
