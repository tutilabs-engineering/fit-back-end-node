import { FindSpecificFitByCode } from '../../../domain/useCase/ViewSpecificByCode/view-specific-by-code'
import { FindFitByCodeRepository } from '../../repositories/data/fit/find-fit-by-code-repository'

export class DdFindFitByCode implements FindSpecificFitByCode {
  constructor(
    private readonly findSpecificFitByCodeRepository: FindFitByCodeRepository
  ) {}

  async execute(
    fit: FindFitByCodeRepository.Query
  ): Promise<FindFitByCodeRepository.Result> {
    const findSpecificFitByCode =
      await this.findSpecificFitByCodeRepository.findFitByCode(fit)
    return findSpecificFitByCode
  }
}
