import { OnApproval } from '../../../domain/useCase/ViewSpecific/view-specific'
import { OnApprovalRepository } from '../../repositories/data/fit/on-approval-repository'

export class DbOnApproval implements OnApproval {
  constructor(private readonly onApprovalRepository: OnApprovalRepository) {}
  async execute(fit: OnApproval.Params): Promise<OnApproval.Result> {
    const Save = await this.onApprovalRepository.execute(fit)
    return Save
  }
}
