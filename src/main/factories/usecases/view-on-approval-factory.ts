import { ViewOnApproval } from '../../../domain/useCase/OnApproval/view-on-approval'
import { ViewOnApprovalMySqlRepository } from '../../../infra/data-mysql/on-approval-mysql/view-on-approval-mysql-repository'
import { DbViewOnApproval } from '../../../infra/implements/usecase/db-view-on-approval'

export const makedDbViewOnApproval = (): ViewOnApproval => {
  const viewOnApprovalRepository = new ViewOnApprovalMySqlRepository()
  return new DbViewOnApproval(viewOnApprovalRepository)
}
