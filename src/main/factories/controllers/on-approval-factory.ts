import { OnApprovalController } from '../../../presentation/Controllers/on-approval-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makedDbOnApproval } from '../usecases/on-approval-factory'

export const makeOnApprovalController = (): Controller => {
  const controller = new OnApprovalController(makedDbOnApproval())
  return controller
}
