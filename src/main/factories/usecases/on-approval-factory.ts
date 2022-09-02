import { OnApproval } from '../../../domain/useCase/OnApproval/on-approval'
import { OnApprovalMySqlRepository } from '../../../infra/data-mysql/on-approval-mysql-repository'
import { DbOnApproval } from '../../../infra/implements/usecase/db-on-approval'

export const makedDbOnApproval = (): OnApproval => {
  const onApprovalRepository = new OnApprovalMySqlRepository()
  return new DbOnApproval(onApprovalRepository)
}
