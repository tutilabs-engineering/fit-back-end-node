import { OnApproval } from '../../../domain/useCase/ViewSpecific/view-specific'
import { OnApprovalMySqlRepository } from '../../../infra/data-mysql/ViewSpecificMySql/on-approval-mysql-repository'
import { DbOnApproval } from '../../../infra/implements/usecase/db-on-approval'

export const makedDbOnApproval = (): OnApproval => {
  const onApprovalRepository = new OnApprovalMySqlRepository()
  return new DbOnApproval(onApprovalRepository)
}
