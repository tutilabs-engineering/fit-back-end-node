import { FitModel } from '../models/fit'

export interface ListHomologated {
  execute: () => Promise<ListHomologated.Result>
}

export namespace ListHomologated {
  export type Params = FitModel
  export type Result = Omit<
    FitModel,
    'Attention_point_control' | 'workstations'
  >
}
