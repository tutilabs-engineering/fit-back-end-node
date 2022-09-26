import { HomologationFit } from '../../../domain/useCase/Homologation/homologation-fit'
import { HomologationFitRepository } from '../../repositories/data/fit/homologation-repository'

export class DbHomologationFit implements HomologationFit {
  constructor(
    private readonly homologationFitRepository: HomologationFitRepository
  ) {}

  async execute(
    request: HomologationFit.Params
  ): Promise<HomologationFit.Result> {
    return await this.homologationFitRepository.homolog(request)
  }
}
