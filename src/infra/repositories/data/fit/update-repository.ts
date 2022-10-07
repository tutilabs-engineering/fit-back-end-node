import { UpdateFit } from '../../../../domain/useCase/Update/update-fit'

export interface UpdateFitRepository {
  update: (
    fit: UpdateFitRepository.Params
  ) => Promise<UpdateFitRepository.Result>
}

export namespace UpdateFitRepository {
  export type Params = UpdateFit.Params
  export type Result = UpdateFit.Result
}
