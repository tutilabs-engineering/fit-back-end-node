import { HomologationFit } from '../../../../domain/useCase/Homologation/homologation-fit'

export interface HomologationFitRepository {
  homolog: (
    request: HomologationFitRepository.Params
  ) => Promise<HomologationFitRepository.Result>
}

export namespace HomologationFitRepository {
  export type Params = HomologationFit.Params
  export type Result = HomologationFit.Result
}
