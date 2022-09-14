import { ViewOnApproval } from '../../../../domain/useCase/OnApproval/view-on-approval'

export interface ViewOnApprovalRepository {
  execute: (
    fit: ViewOnApprovalRepository.Body
  ) => Promise<ViewOnApprovalRepository.Result>
}

export namespace ViewOnApprovalRepository {
  export type Body = ViewOnApproval.Params
  export type Result = ViewOnApproval.Result
}
