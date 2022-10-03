import { VersioningFIt } from '../../../../domain/useCase/Versioning/versioning-fit'

export interface VersioningFitRepository {
  versioning: (
    fit: VersioningFitRepository.Params
  ) => Promise<VersioningFitRepository.Result>
}

export namespace VersioningFitRepository {
  export type Params = VersioningFIt.Params
  export type Result = VersioningFIt.Result
}
