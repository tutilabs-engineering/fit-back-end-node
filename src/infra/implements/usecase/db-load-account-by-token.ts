import { LoadAccountByToken } from '../../../domain/useCase/Auth/load-account-by-token'
import { LoadAccountByTokenRepository } from '../../repositories/data/fit/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(
    accessToken: string,
    role?: string
  ): Promise<LoadAccountByToken.Result> {
    const [, token] = accessToken.split(' ')
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        token,
        role
      )
      if (account) {
        return account
      }
    }
    return null
  }
}
