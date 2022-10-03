import { VersioningFIt } from '../../../domain/useCase/Versioning/versioning-fit'
import { VersioningFitRepository } from '../../repositories/data/fit/versioning-repository'

export class DbVersioningFit implements VersioningFIt {
  constructor(
    private readonly versioningFitRepository: VersioningFitRepository
  ) {}

  async execute(fit: VersioningFIt.Params): Promise<VersioningFIt.Result> {
    const updateFitversioning = await this.versioningFitRepository.versioning(
      fit
    )
    return updateFitversioning
  }
}
