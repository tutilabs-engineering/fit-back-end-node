import { OnApproval } from '../../../../domain/useCase/ViewOnApproval/view-on-approval'

export interface OnApprovalRepository {
  execute: (
    fit: OnApprovalRepository.Params
  ) => Promise<OnApprovalRepository.Result>
}

export namespace OnApprovalRepository {
  export type Params = OnApproval.Params
  export type Result = OnApproval.Result
}
