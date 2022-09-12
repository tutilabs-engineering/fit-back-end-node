import { OnApproval } from '../../../../domain/useCase/ViewOnApproval/view-on-approval'

export interface OnApprovalRepository {
  execute: (
    fit: OnApprovalRepository.Body
  ) => Promise<OnApprovalRepository.Result>
}

export namespace OnApprovalRepository {
  export type Body = OnApproval.Params
  export type Result = OnApproval.Result
}
