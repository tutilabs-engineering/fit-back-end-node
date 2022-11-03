import { FindFitByCodeController } from '../../../presentation/Controllers/find-fit-by-code-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeDbFindFitByCode } from '../usecases/find-fit-by-code'

export const makeFindFitByCodeController = (): Controller => {
  const controller = new FindFitByCodeController(makeDbFindFitByCode())
  return controller
}
