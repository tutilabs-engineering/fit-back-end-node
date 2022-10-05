export interface AddFit {
  execute: (fit: AddFit.Params) => Promise<AddFit.Result>
}

export namespace AddFit {
  export type Params = {
    body: any
    files: any
    account: any
  }
  export type Result = Promise<void>
}
