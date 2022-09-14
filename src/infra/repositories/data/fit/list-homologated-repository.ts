import { ListHomologated } from '../../../../domain/useCase/Homologated/list-homologated'

export interface ListHomologatedRepository {
  execute: () => Promise<ListHomologatedRepository.Result>
}

export namespace ListHomologatedRepository {
  export type Body = ListHomologated.Params
  export type Result = ListHomologated.Result
}
