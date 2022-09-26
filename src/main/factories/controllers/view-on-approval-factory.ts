import { ViewOnApprovalController } from '../../../presentation/Controllers/view-on-approval-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makedDbViewOnApproval } from '../usecases/view-on-approval-factory'

export const makeViewOnApprovalController = (): Controller => {
  const controller = new ViewOnApprovalController(makedDbViewOnApproval())
  return controller
}
