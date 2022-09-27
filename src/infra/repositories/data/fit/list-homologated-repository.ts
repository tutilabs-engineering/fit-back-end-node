import { ListHomologated } from '../../../../domain/useCase/ListHomologated/list-homologated'

export interface ListHomologatedRepository {
  ListFitHomologated: () => Promise<ListHomologatedRepository.Result[]>
}

export namespace ListHomologatedRepository {
  export type Body = ListHomologated.Params
  export type Result = ListHomologated.Result
}
