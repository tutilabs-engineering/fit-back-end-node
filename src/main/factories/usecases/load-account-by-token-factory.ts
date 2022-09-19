import { LoadAccountByToken } from '../../../domain/useCase/Auth/load-account-by-token'
// import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DbLoadAccountByToken } from '../../../infra/implements/usecase/db-load-account-by-token'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  //   const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const fitMysqlRepository = new FitMysqlRepository()
  return new DbLoadAccountByToken(fitMysqlRepository)
}
