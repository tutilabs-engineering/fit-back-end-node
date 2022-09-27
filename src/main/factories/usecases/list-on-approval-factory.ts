import { ListOnApproval } from '../../../domain/useCase/ListOnApproval/list-on-approval'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbListOnApproval } from '../../../infra/implements/usecase/db-list-on-approval'

export const makedDbListOnApproval = (): ListOnApproval => {
  const listOnApprovalRepository = new FitMysqlRepository()
  return new DbListOnApproval(listOnApprovalRepository)
}
