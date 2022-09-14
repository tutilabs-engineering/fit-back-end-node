import { ListOnApproval } from '../../../../domain/useCase/OnApproval/list-on-approval'

export interface ListOnApprovalRepository {
  execute: () => Promise<ListOnApprovalRepository.Result>
}

export namespace ListOnApprovalRepository {
  export type Body = ListOnApproval.Params
  export type Result = ListOnApproval.Result
}
