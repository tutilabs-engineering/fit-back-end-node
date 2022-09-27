import { FindSpecificFit } from '../../../domain/useCase/ViewSpecific/view-specific'
import { FindByFitRepository } from '../../repositories/data/fit/find-by-fit-repository'

export class DdFindByFit implements FindSpecificFit {
  constructor(
    private readonly findByOnApprovalSpecificRepository: FindByFitRepository
  ) {}

  async execute(
    fit: FindByFitRepository.Params
  ): Promise<FindByFitRepository.Result> {
    const findByOnApprovalSpacific =
      await this.findByOnApprovalSpecificRepository.findByFit(fit)
    return findByOnApprovalSpacific
  }
}
