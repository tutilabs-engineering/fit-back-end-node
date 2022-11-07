import { ListFitByCode } from '../../../domain/useCase/ListFitByCode/list-fit-by-code'
import { ListFitByCodeRepository } from '../../repositories/data/fit/list-fit-by-code'

export class DdListFitByCode implements ListFitByCode {
  constructor(
    private readonly listFitByCodeRepository: ListFitByCodeRepository
  ) {}

  async execute(
    fit: ListFitByCodeRepository.Query
  ): Promise<ListFitByCodeRepository.Result> {
    const listFitByCode = await this.listFitByCodeRepository.listFitByCode(fit)
    return listFitByCode
  }
}
