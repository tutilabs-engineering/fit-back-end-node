import { AddFit } from '../../../domain/useCase/Add/add-fit'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbAddFit } from '../../../infra/implements/usecase/db-add-fit'

export const makeDbAddFit = (): AddFit => {
  const fitMysqlRepository = new FitMysqlRepository()
  return new DbAddFit(fitMysqlRepository)
}
