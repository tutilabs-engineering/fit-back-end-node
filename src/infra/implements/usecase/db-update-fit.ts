import { UpdateFit } from '../../../domain/useCase/Update/update-fit'
import { UpdateFitRepository } from '../../repositories/data/fit/update-repository'

export class DbUpdateFit implements UpdateFit {
  constructor(private readonly updateFitRepository: UpdateFitRepository) {}
  async execute(fit: UpdateFit.Params): Promise<UpdateFit.Result> {
    const Save = await this.updateFitRepository.update(fit)
    return Save
  }
}
