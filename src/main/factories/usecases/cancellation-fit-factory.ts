import { CancellationFit } from '../../../domain/useCase/Cancellation/cancellation-fit'
import { FitMysqlRepository } from '../../../infra/data-mysql/fit-mysql-repository'
import { DdCancellationFit } from '../../../infra/implements/usecase/db-cancellation-fit'

export const makeDbCancellationFit = (): CancellationFit => {
  const cancellationFItRepository = new FitMysqlRepository()
  return new DdCancellationFit(cancellationFItRepository)
}
