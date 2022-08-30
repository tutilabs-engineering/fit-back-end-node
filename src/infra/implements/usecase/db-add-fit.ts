import { AddFit } from '../../../domain/useCase/Add/add-fit'
import { AddFitRepository } from '../../repositories/data/fit/add-repository'

export class DbAddFit implements AddFit {
  constructor(private readonly addFitRepository: AddFitRepository) {}
  async execute(fit: AddFit.Params): Promise<AddFit.Result> {
    const Save = await this.addFitRepository.add(fit)
    return Save
  }
}
