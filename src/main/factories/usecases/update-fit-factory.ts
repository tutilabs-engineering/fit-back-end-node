import { UpdateFit } from '../../../domain/useCase/Update/update-fit'
import { UpdateMysqlRepository } from '../../../infra/data-mysql/update-mysql-repository'
import { DbUpdateFit } from '../../../infra/implements/usecase/db-update-fit'

export const makeDbUpdateFit = (): UpdateFit => {
  const updateFitRepository = new UpdateMysqlRepository()
  return new DbUpdateFit(updateFitRepository)
}
