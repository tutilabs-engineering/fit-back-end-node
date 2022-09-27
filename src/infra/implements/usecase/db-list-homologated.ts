import { ListHomologated } from '../../../domain/useCase/ListHomologated/list-homologated'
import { ListHomologatedRepository } from '../../repositories/data/fit/list-homologated-repository'

export class DbListHomologated implements ListHomologated {
  constructor(
    private readonly listHomologatedRepository: ListHomologatedRepository
  ) {}

  async execute(): Promise<ListHomologated.Result[]> {
    const findListFitHomologated =
      await this.listHomologatedRepository.ListFitHomologated()
    return findListFitHomologated
  }
}
