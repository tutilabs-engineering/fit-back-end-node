import { AddFit } from '../../../domain/useCase/Add/add-fit'
import { AddMysqlRepository } from '../../../infra/data-mysql/add-mysql-repository'
import { DbAddFit } from '../../../infra/implements/usecase/db-add-fit'

export const makeDbAddFit = (): AddFit => {
  const addFitRepository = new AddMysqlRepository()
  return new DbAddFit(addFitRepository)
}
