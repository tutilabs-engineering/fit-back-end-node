import { CancellationFit } from '../../../domain/useCase/Cancellation/cancellation-fit'
import { CancellationFitRepository } from '../../repositories/data/fit/cancellation-fit-repository'

export class DdCancellationFit implements CancellationFit {
  constructor(
    private readonly cancellationFitRepository: CancellationFitRepository
  ) {}

  async execute(
    id: CancellationFitRepository.Params
  ): Promise<CancellationFitRepository.Result> {
    const cancelFit = await this.cancellationFitRepository.cancel(id)
    return cancelFit
  }
}
