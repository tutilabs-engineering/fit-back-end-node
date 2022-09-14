import { ListOnApproval } from '../../../domain/useCase/OnApproval/list-on-approval'
import { ListOnApprovalMySqlRepository } from '../../../infra/data-mysql/on-approval-mysql/list-on-approval-mysql-repository'
import { DbListOnApproval } from '../../../infra/implements/usecase/db-list-on-approval'

export const makedDbListOnApproval = (): ListOnApproval => {
  const listOnApprovalRepository = new ListOnApprovalMySqlRepository()
  return new DbListOnApproval(listOnApprovalRepository)
}
