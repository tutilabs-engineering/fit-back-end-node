import { ListOnApproval } from '../../../domain/useCase/ListOnApproval/list-on-approval'
import { ListOnApprovalRepository } from '../../repositories/data/fit/list-on-approval-repository'

export class DbListOnApproval implements ListOnApproval {
  constructor(
    private readonly listOnApprovalRepository: ListOnApprovalRepository
  ) {}

  async execute(fit: ListOnApproval.Params): Promise<ListOnApproval.Result> {
    const Save = await this.listOnApprovalRepository.execute(fit)
    return Save
  }
}
