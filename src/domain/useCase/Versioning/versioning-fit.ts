export interface VersioningFIt {
  execute: (fit: VersioningFIt.Params) => Promise<VersioningFIt.Result>
}

export namespace VersioningFIt {
  export type Params = {
    body: any
    files: any
    account: any
  }
  export type Result = Promise<void>
}
