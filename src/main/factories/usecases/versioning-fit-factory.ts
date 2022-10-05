import { VersioningFIt } from '../../../domain/useCase/Versioning/versioning-fit'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbVersioningFit } from '../../../infra/implements/usecase/db-versioning-fit'

export const makeDbVersioningFit = (): VersioningFIt => {
  const fitMysqlRepository = new FitMysqlRepository()
  return new DbVersioningFit(fitMysqlRepository)
}
