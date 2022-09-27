import { ListOnApprovalController } from '../../../presentation/Controllers/list-on-approval-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makedDbListOnApproval } from '../usecases/list-on-approval-factory'

export const makeListOnApprovalController = (): Controller => {
  const controller = new ListOnApprovalController(makedDbListOnApproval())
  return controller
}
