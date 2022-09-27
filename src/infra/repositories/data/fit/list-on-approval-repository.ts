import { ListOnApproval } from '../../../../domain/useCase/ListOnApproval/list-on-approval'

export interface ListOnApprovalRepository {
  listOnApproval: () => Promise<ListOnApprovalRepository.Result[]>
}

export namespace ListOnApprovalRepository {
  export type Body = ListOnApproval.Params
  export type Result = ListOnApproval.Result
}
