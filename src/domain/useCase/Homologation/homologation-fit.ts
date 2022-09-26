export interface HomologationFit {
  execute: (request: HomologationFit.Params) => Promise<HomologationFit.Result>
}

export namespace HomologationFit {
  export type Params = {
    params: {
      id: number
    }
    account: any
    body: any
  }
  export type Result = Promise<void>
}
