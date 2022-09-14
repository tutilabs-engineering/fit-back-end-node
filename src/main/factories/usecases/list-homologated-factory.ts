import { ListHomologated } from '../../../domain/useCase/Homologated/list-homologated'
import { ListHomologatedMySqlRepository } from '../../../infra/data-mysql/homologated-mysql/list-homologated-mysql-repository'
import { DbListHomologated } from '../../../infra/implements/usecase/db-list-homologated'

export const makedDbListHomologated = (): ListHomologated => {
  const listHomologatedRepository = new ListHomologatedMySqlRepository()
  return new DbListHomologated(listHomologatedRepository)
}
