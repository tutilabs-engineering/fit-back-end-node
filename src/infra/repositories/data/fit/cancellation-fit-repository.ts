import { CancellationFit } from '../../../../domain/useCase/Cancellation/cancellation-fit'

export interface CancellationFitRepository {
  cancel: (
    id: CancellationFitRepository.Params
  ) => Promise<CancellationFitRepository.Result>
}

export namespace CancellationFitRepository {
  export type Params = CancellationFit.Params
  export type Result = CancellationFit.Result
}
