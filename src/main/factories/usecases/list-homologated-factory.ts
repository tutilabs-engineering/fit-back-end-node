import { ListHomologated } from '../../../domain/useCase/ListHomologated/list-homologated'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbListHomologated } from '../../../infra/implements/usecase/db-list-homologated'

export const makedDbListHomologated = (): ListHomologated => {
  const listHomologatedRepository = new FitMysqlRepository()
  return new DbListHomologated(listHomologatedRepository)
}
