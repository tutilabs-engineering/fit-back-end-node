export interface HomologationFit {
  execute: (request: HomologationFit.Params) => Promise<HomologationFit.Result>
}

export namespace HomologationFit {
  export type Params = {
    params: {
      id: number
    }
    account: any
    body: any,
    accessToken: string
  }
  export type Result = Promise<void>
}
