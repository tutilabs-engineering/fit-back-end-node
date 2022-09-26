import { HomologationFit } from '../../../domain/useCase/Homologation/homologation-fit'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbHomologationFit } from '../../../infra/implements/usecase/db-homologation-fit'

export const makeHomologationFit = (): HomologationFit => {
  const fitMysqlRepository = new FitMysqlRepository()
  return new DbHomologationFit(fitMysqlRepository)
}
