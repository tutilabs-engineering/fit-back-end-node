import { ViewOnApproval } from '../../../domain/useCase/ViewOnApproval/view-on-approval'
import { ViewOnApprovalRepository } from '../../repositories/data/fit/view-on-approval-repository'

export class DbViewOnApproval implements ViewOnApproval {
  constructor(
    private readonly viewOnApprovalRepository: ViewOnApprovalRepository
  ) {}

  async execute(fit: ViewOnApproval.Params): Promise<ViewOnApproval.Result> {
    const Save = await this.viewOnApprovalRepository.execute(fit)
    return Save
  }
}
