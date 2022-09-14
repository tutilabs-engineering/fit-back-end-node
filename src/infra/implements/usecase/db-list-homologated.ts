import { ListHomologated } from '../../../domain/useCase/Homologated/list-homologated'
import { ListHomologatedRepository } from '../../repositories/data/fit/list-homologated-repository'

export class DbListHomologated implements ListHomologated {
  constructor(
    private readonly listHomologatedRepository: ListHomologatedRepository
  ) {}

  async execute(): Promise<ListHomologated.Result> {
    const Save = await this.listHomologatedRepository.execute()
    return Save
  }
}
