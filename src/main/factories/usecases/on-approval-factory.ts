import { OnApproval } from '../../../domain/useCase/ViewOnApproval/view-on-approval'
import { OnApprovalMySqlRepository } from '../../../infra/data-mysql/ViewOnApprovalMySql/on-approval-mysql-repository'
import { DbOnApproval } from '../../../infra/implements/usecase/db-on-approval'

export const makedDbOnApproval = (): OnApproval => {
  const onApprovalRepository = new OnApprovalMySqlRepository()
  return new DbOnApproval(onApprovalRepository)
}
