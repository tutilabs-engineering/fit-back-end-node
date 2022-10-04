export interface CancellationFit {
  execute: (fit: CancellationFit.Params) => Promise<CancellationFit.Result>
}

export namespace CancellationFit {
  export type Params = {
    id: number
  }
  export type Result = Promise<void>
}
